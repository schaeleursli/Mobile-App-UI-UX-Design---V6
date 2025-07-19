import React, { useEffect, useState, useRef, createElement } from 'react';
import { CameraIcon, SatelliteIcon, MicIcon, StickyNoteIcon, XIcon, ImageIcon, PlusIcon, PencilIcon, TypeIcon, ArrowUpRightIcon, SquareIcon, TrashIcon, RulerIcon, CheckIcon, PenIcon, RotateCcwIcon } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { GlassButton } from '../ui/GlassButton';
import { useTheme } from '../../contexts/ThemeContext';
export interface MediaControlsProps {
  onCameraClick?: () => void;
  onSatelliteClick?: () => void;
  onNoteChange?: (note: string) => void;
  onAudioRecorded?: (audioBlob: Blob) => void;
  photos?: string[];
  onPhotosChange?: (photos: string[]) => void;
}
export function MediaControls({
  onCameraClick,
  onSatelliteClick,
  onNoteChange,
  onAudioRecorded,
  photos = [],
  onPhotosChange
}: MediaControlsProps) {
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [showVoicePopup, setShowVoicePopup] = useState(false);
  const [showPhotoEditor, setShowPhotoEditor] = useState(false);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [note, setNote] = useState('');
  const [activeDrawingTool, setActiveDrawingTool] = useState<string | null>(null);
  const [drawings, setDrawings] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({
    x: 0,
    y: 0
  });
  const [currentPoint, setCurrentPoint] = useState({
    x: 0,
    y: 0
  });
  const [measurementValue, setMeasurementValue] = useState('');
  const [measurementPosition, setMeasurementPosition] = useState({
    x: 0,
    y: 0
  });
  const [showMeasurementInput, setShowMeasurementInput] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [textInputPosition, setTextInputPosition] = useState({
    x: 0,
    y: 0
  });
  const [showTextInput, setShowTextInput] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const {
    colors
  } = useTheme();
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    if (onNoteChange) {
      onNoteChange(e.target.value);
    }
  };
  const handleSaveNote = () => {
    if (onNoteChange) {
      onNoteChange(note);
    }
    setShowNotePopup(false);
  };
  const handleCameraClick = () => {
    if (onCameraClick) {
      onCameraClick();
    } else {
      // Default camera functionality if no handler provided
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.capture = 'environment';
      fileInput.click();
      fileInput.onchange = e => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0] && onPhotosChange) {
          const newPhotos = [...photos];
          // In a real app, we would upload the file and get a URL
          // For now, just create an object URL
          const url = URL.createObjectURL(target.files[0]);
          newPhotos.push(url);
          onPhotosChange(newPhotos);
        }
      };
    }
  };
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop recording audio
    if (isRecording && onAudioRecorded) {
      // Simulate recording complete
      setTimeout(() => {
        // This would be a real audio blob in a production app
        onAudioRecorded(new Blob());
        setIsRecording(false);
        setShowVoicePopup(false);
      }, 1000);
    }
  };
  const handleEditPhoto = (index: number) => {
    setEditingPhotoIndex(index);
    setShowPhotoEditor(true);
    setDrawings([]);
  };
  const handleCloseEditor = () => {
    setShowPhotoEditor(false);
    setEditingPhotoIndex(null);
    setActiveDrawingTool(null);
    setDrawings([]);
  };
  const handleSaveEditedPhoto = () => {
    // In a real implementation, we would merge the drawings with the photo
    // and create a new image. For now, we'll just close the editor
    setShowPhotoEditor(false);
    setEditingPhotoIndex(null);
    setActiveDrawingTool(null);
  };
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!activeDrawingTool || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setStartPoint({
      x,
      y
    });
    setCurrentPoint({
      x,
      y
    });
    if (activeDrawingTool === 'text') {
      setTextInputPosition({
        x,
        y
      });
      setShowTextInput(true);
      setIsDrawing(false);
    }
  };
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || !activeDrawingTool) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPoint({
      x,
      y
    });
    redrawCanvas();
  };
  const handleCanvasMouseUp = () => {
    if (!isDrawing || !activeDrawingTool || !canvasRef.current) return;
    setIsDrawing(false);
    if (activeDrawingTool === 'measurement') {
      const midX = (startPoint.x + currentPoint.x) / 2;
      const midY = (startPoint.y + currentPoint.y) / 2;
      setMeasurementPosition({
        x: midX,
        y: midY
      });
      setShowMeasurementInput(true);
    } else {
      saveDrawing();
    }
  };
  const saveDrawing = () => {
    if (!activeDrawingTool) return;
    const newDrawing = {
      type: activeDrawingTool,
      startX: startPoint.x,
      startY: startPoint.y,
      endX: currentPoint.x,
      endY: currentPoint.y,
      text: activeDrawingTool === 'text' ? textInputValue : '',
      measurement: activeDrawingTool === 'measurement' ? measurementValue : '',
      color: activeDrawingTool === 'polygon' ? 'rgba(255, 0, 0, 0.3)' : '#ff0000'
    };
    setDrawings([...drawings, newDrawing]);
    redrawCanvas();
  };
  const redrawCanvas = () => {
    if (!canvasRef.current || !imageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the image
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    // Draw all saved drawings
    drawings.forEach(drawing => {
      drawShape(ctx, drawing);
    });
    // Draw current shape being created
    if (isDrawing && activeDrawingTool) {
      const tempDrawing = {
        type: activeDrawingTool,
        startX: startPoint.x,
        startY: startPoint.y,
        endX: currentPoint.x,
        endY: currentPoint.y,
        text: '',
        measurement: '',
        color: activeDrawingTool === 'polygon' ? 'rgba(255, 0, 0, 0.3)' : '#ff0000'
      };
      drawShape(ctx, tempDrawing);
    }
  };
  const drawShape = (ctx: CanvasRenderingContext2D, drawing: any) => {
    ctx.strokeStyle = drawing.color;
    ctx.fillStyle = drawing.color;
    ctx.lineWidth = 2;
    switch (drawing.type) {
      case 'arrow':
        drawArrow(ctx, drawing.startX, drawing.startY, drawing.endX, drawing.endY);
        break;
      case 'measurement':
        drawLine(ctx, drawing.startX, drawing.startY, drawing.endX, drawing.endY);
        if (drawing.measurement) {
          const midX = (drawing.startX + drawing.endX) / 2;
          const midY = (drawing.startY + drawing.endY) / 2;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(midX - 25, midY - 10, 50, 20);
          ctx.strokeRect(midX - 25, midY - 10, 50, 20);
          ctx.fillStyle = '#000000';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(drawing.measurement, midX, midY);
        }
        break;
      case 'polygon':
        ctx.beginPath();
        ctx.rect(drawing.startX, drawing.startY, drawing.endX - drawing.startX, drawing.endY - drawing.startY);
        ctx.fill();
        ctx.stroke();
        break;
      case 'text':
        if (drawing.text) {
          ctx.font = '16px Arial';
          ctx.fillStyle = '#000000';
          ctx.fillText(drawing.text, drawing.startX, drawing.startY);
        }
        break;
      default:
        break;
    }
  };
  const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
    const headLength = 10;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    // Draw line
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    // Draw arrowhead
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  };
  const drawLine = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  };
  const handleMeasurementSubmit = () => {
    setShowMeasurementInput(false);
    saveDrawing();
  };
  const handleTextSubmit = () => {
    setShowTextInput(false);
    saveDrawing();
  };
  const handleDeleteLastDrawing = () => {
    if (drawings.length > 0) {
      const newDrawings = [...drawings];
      newDrawings.pop();
      setDrawings(newDrawings);
      redrawCanvas();
    }
  };
  // Effect to initialize canvas when photo editor is opened
  useEffect(() => {
    if (showPhotoEditor && canvasRef.current && imageRef.current && editingPhotoIndex !== null) {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      img.onload = () => {
        // Set canvas dimensions to match image aspect ratio
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight - 160; // Account for toolbars
        let canvasWidth, canvasHeight;
        if (maxWidth / aspectRatio <= maxHeight) {
          canvasWidth = maxWidth;
          canvasHeight = maxWidth / aspectRatio;
        } else {
          canvasHeight = maxHeight;
          canvasWidth = maxHeight * aspectRatio;
        }
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        // Initial draw of the image
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        }
      };
      img.src = photos[editingPhotoIndex];
    }
  }, [showPhotoEditor, editingPhotoIndex, photos]);
  return <GlassPanel className="p-8 relative min-h-[300px] flex flex-col items-center justify-center">
      {photos.length === 0 ? <>
          <p className="text-lg mb-4">No Photos</p>
          <div className="flex space-x-4 mb-4"></div>
        </> : <div className="w-full">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {photos.map((photo, index) => <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <GlassButton onClick={() => handleEditPhoto(index)} variant="primary" size="icon" className="p-1 rounded-full" icon={<PencilIcon size={16} />} />
                  <GlassButton onClick={() => {
              if (onPhotosChange) {
                const newPhotos = [...photos];
                newPhotos.splice(index, 1);
                onPhotosChange(newPhotos);
              }
            }} variant="danger" size="icon" className="p-1 rounded-full" icon={<XIcon size={16} />} />
                </div>
                {/* Metadata overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-2 glass backdrop-blur-md bg-black/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white">
                      Photo {index + 1}
                    </span>
                    <span className="text-xs text-white">Field Survey</span>
                  </div>
                </div>
              </div>)}
            <GlassButton onClick={handleCameraClick} variant="secondary" className="flex items-center justify-center aspect-square" icon={<CameraIcon size={24} />}>
              Add Photo
            </GlassButton>
          </div>
        </div>}
      {/* Image Overlay Controls */}
      <div className="absolute top-4 right-4 space-x-2">
        <GlassButton onClick={() => setShowNotePopup(true)} variant="secondary" size="icon" className="rounded-full" icon={<StickyNoteIcon size={20} className="text-blue-500" />} />
        <GlassButton onClick={() => setShowVoicePopup(true)} variant="secondary" size="icon" className="rounded-full" icon={<MicIcon size={20} className="text-red-500" />} />
      </div>
      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-between">
        <GlassButton onClick={onSatelliteClick} variant="secondary" size="icon" className="rounded-full" icon={<SatelliteIcon size={24} />} />
        <GlassButton onClick={handleCameraClick} variant="primary" size="icon" className="rounded-full" icon={<CameraIcon size={24} />} />
      </div>
      {/* Note Popup */}
      {showNotePopup && <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-20">
          <GlassPanel className="p-4 rounded-xl w-5/6 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Note</h3>
              <GlassButton onClick={() => setShowNotePopup(false)} variant="ghost" size="icon" className="p-1" icon={<XIcon size={20} />} />
            </div>
            <textarea value={note} onChange={handleNoteChange} className="w-full h-32 p-3 rounded-xl dark:bg-gray-700/50 bg-white/50 backdrop-blur-sm border border-white/10 dark:border-white/5" placeholder="Enter your note..." />
            <GlassButton onClick={handleSaveNote} variant="primary" className="mt-4 w-full">
              Save Note
            </GlassButton>
          </GlassPanel>
        </div>}
      {/* Voice Recording Popup */}
      {showVoicePopup && <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-20">
          <GlassPanel className="p-4 rounded-xl max-w-xs w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Voice Recording</h3>
              <GlassButton onClick={() => setShowVoicePopup(false)} variant="ghost" size="icon" className="p-1" icon={<XIcon size={20} />} />
            </div>
            <div className="flex flex-col items-center space-y-4">
              <button onClick={toggleRecording} className={`p-6 rounded-full transition-all ${isRecording ? 'bg-red-500 animate-pulse scale-110' : 'glass'}`}>
                <MicIcon size={32} className={isRecording ? 'text-white' : 'text-red-500'} />
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isRecording ? 'Recording...' : 'Tap to record'}
              </p>
            </div>
          </GlassPanel>
        </div>}
      {/* Photo Editor */}
      {showPhotoEditor && editingPhotoIndex !== null && <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Hidden image for reference */}
          <img ref={imageRef} src={photos[editingPhotoIndex]} className="hidden" alt="Editor reference" />
          {/* Header */}
          <div className="flex justify-between items-center p-4 glass">
            <GlassButton onClick={handleCloseEditor} variant="ghost" size="icon" className="text-white" icon={<XIcon size={24} />} />
            <h2 className="text-white text-lg font-medium">Photo Editor</h2>
            <GlassButton onClick={handleSaveEditedPhoto} variant="ghost" size="icon" className="text-white" icon={<CheckIcon size={24} />} />
          </div>
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center bg-gray-800 overflow-hidden">
            <canvas ref={canvasRef} onMouseDown={handleCanvasMouseDown} onMouseMove={handleCanvasMouseMove} onMouseUp={handleCanvasMouseUp} onMouseLeave={handleCanvasMouseUp} className="max-w-full max-h-full" />
          </div>
          {/* Toolbar */}
          <div className="glass p-4">
            <div className="flex justify-around">
              <GlassButton onClick={() => setActiveDrawingTool('arrow')} variant={activeDrawingTool === 'arrow' ? 'primary' : 'ghost'} size="icon" className="rounded-full" icon={<ArrowUpRightIcon size={24} />} />
              <GlassButton onClick={() => setActiveDrawingTool('text')} variant={activeDrawingTool === 'text' ? 'primary' : 'ghost'} size="icon" className="rounded-full" icon={<TypeIcon size={24} />} />
              <GlassButton onClick={() => setActiveDrawingTool('measurement')} variant={activeDrawingTool === 'measurement' ? 'primary' : 'ghost'} size="icon" className="rounded-full" icon={<RulerIcon size={24} />} />
              <GlassButton onClick={() => setActiveDrawingTool('polygon')} variant={activeDrawingTool === 'polygon' ? 'primary' : 'ghost'} size="icon" className="rounded-full" icon={<SquareIcon size={24} />} />
              <GlassButton onClick={handleDeleteLastDrawing} variant="ghost" size="icon" className="rounded-full text-red-500" icon={<TrashIcon size={24} />} />
            </div>
          </div>
          {/* Measurement Input */}
          {showMeasurementInput && <div className="absolute glass rounded-lg p-2 shadow-lg" style={{
        left: `${measurementPosition.x}px`,
        top: `${measurementPosition.y}px`,
        transform: 'translate(-50%, -50%)'
      }}>
              <div className="flex">
                <input type="text" value={measurementValue} onChange={e => setMeasurementValue(e.target.value)} placeholder="Enter measurement" className="p-1 bg-white/20 backdrop-blur-md border border-white/10 rounded-l w-32" autoFocus />
                <button onClick={handleMeasurementSubmit} className="bg-blue-500 text-white p-1 rounded-r">
                  <CheckIcon size={16} />
                </button>
              </div>
            </div>}
          {/* Text Input */}
          {showTextInput && <div className="absolute glass rounded-lg p-2 shadow-lg" style={{
        left: `${textInputPosition.x}px`,
        top: `${textInputPosition.y}px`
      }}>
              <div className="flex">
                <input type="text" value={textInputValue} onChange={e => setTextInputValue(e.target.value)} placeholder="Enter text" className="p-1 bg-white/20 backdrop-blur-md border border-white/10 rounded-l w-32" autoFocus />
                <button onClick={handleTextSubmit} className="bg-blue-500 text-white p-1 rounded-r">
                  <CheckIcon size={16} />
                </button>
              </div>
            </div>}
        </div>}
    </GlassPanel>;
}