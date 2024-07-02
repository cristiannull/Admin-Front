import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private orderService = inject(OrderService);

  orders = signal<any>([]);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders: any) => {
        this.orders.set(orders);
      },
    });
  }
}
