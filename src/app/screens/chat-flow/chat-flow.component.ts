import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-flow',
  templateUrl: './chat-flow.component.html',
  styleUrls: ['./chat-flow.component.css']
})
export class ChatFlowComponent {
  selectedCard: any = null;
  cards = Array(2)
    .fill(0)
    .map((_, i) => ({
      _id: i,
      top: 0,
      left: 0,
      title: "Random Title",
      message: "Hey 👋 \n How's going?",
      buttons: [
        "Any Vehicle",
        "Saloon",
        "Estate"
      ]
    }));
  selectedButton: any = null

  private isDraggingCard = false;
  private isDraggingCanvas = false;
  private draggedCardIndex: number | null = null;

  private startX = 0;
  private startY = 0;
  private initialX = 0;
  private initialY = 0;

  private canvasStartScrollLeft = 0;
  private canvasStartScrollTop = 0;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    this.randomizeCardPositions();
  }

  randomizeCardPositions() {
    const canvasRect = this.canvas.nativeElement.getBoundingClientRect();

    this.cards = this.cards.map((item) => ({
      ...item,
      top: Math.trunc(Math.random() * (canvasRect.height / 1.2)),
      left: Math.trunc(Math.random() * (canvasRect.width / 1.2))
    }));
  }

  startDraggingCard(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.isDraggingCard = true;
    this.draggedCardIndex = index;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.initialX = this.cards[index].left;
    this.initialY = this.cards[index].top;
  }

  startCanvasDragging(event: MouseEvent) {
    if (this.isDraggingCard) return;

    this.isDraggingCanvas = true;
    this.startX = event.clientX;
    this.startY = event.clientY;

    this.canvasStartScrollLeft = this.canvas.nativeElement.scrollLeft;
    this.canvasStartScrollTop = this.canvas.nativeElement.scrollTop;

    this.canvas.nativeElement.classList.add('dragging');
  }

  onCanvasMouseMove(event: MouseEvent) {
    if (this.isDraggingCard && this.draggedCardIndex !== null) {
      // Dragging card logic
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;

      this.cards[this.draggedCardIndex].left = this.initialX + dx;
      this.cards[this.draggedCardIndex].top = this.initialY + dy;
    } else if (this.isDraggingCanvas) {
      // Dragging canvas logic
      const dx = this.startX - event.clientX;
      const dy = this.startY - event.clientY;

      this.canvas.nativeElement.scrollLeft = this.canvasStartScrollLeft + dx;
      this.canvas.nativeElement.scrollTop = this.canvasStartScrollTop + dy;
    }
  }

  stopCanvasDragging() {
    this.isDraggingCanvas = false;
    this.isDraggingCard = false;
    this.draggedCardIndex = null;

    this.canvas.nativeElement.classList.remove('dragging');
  }

  selectCard = (item: any) => {
    this.selectedCard = item;
  }

  selectButton = (item: any) => {
    this.selectedButton = item;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.stopCanvasDragging();
  }
}
