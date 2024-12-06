import { Notification } from "../types";

export const notifications: Notification[] = [
    // Order-related Notifications:
    {
        isRead: false,
        title: 'New Order Created',
        message: 'A new order has been created. Order ID: 123. Please review the details.',
        type: 'Order Alert',
        createdAt: new Date(),
        priority: 'high'
    },
    {
        isRead: false,
        title: 'Order Status Changed',
        message: 'The status of order 123 has changed to shipped.',
        type: 'Order Update',
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        isRead: false,
        title: 'Order Delivered',
        message: 'Order 123 has been delivered successfully.',
        type: 'Order Update',
        createdAt: new Date(),
        priority: 'low'
    },
    {
        isRead: false,
        title: 'Order Cancelled',
        message: 'Order 123 has been cancelled.',
        type: 'Order Update',
        createdAt: new Date(),
        priority: 'low'
    },
    {
        isRead: false,
        title: 'Urgent Order',
        message: 'Order 123 has been marked as urgent.',
        type: 'Order Alert',
        createdAt: new Date(),
        priority: 'high'
    },
    {
        isRead: false,
        title: 'New Order Assigned',
        message: 'You have been assigned a new order: #123. Please start processing it.',
        type: 'Order Alert',
        createdAt: new Date(),
        priority: 'high'
    },

    // Inventory-related Notifications:
    {
        isRead: false,
        title: 'No Stock Available',
        message: 'Product XYZ is out of stock. Please update the inventory.',
        type: 'Inventory Alert',
        createdAt: new Date(),
        priority: 'high'
    },
    {
        isRead: false,
        title: 'Inventory Threshold Reached',
        message: 'The stock for product XYZ has reached the threshold. 10 remaining!',
        type: 'Inventory Update',
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        isRead: false,
        title: 'New Product Added',
        message: 'A new product, XYZ, has been added to the inventory.',
        type: 'Inventory Update',
        createdAt: new Date(),
        priority: 'low'
    },
    {
        isRead: false,
        title: 'Product Updated',
        message: 'The product XYZ has been updated.',
        type: 'Inventory Update',
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        isRead: false,
        title: 'New Stock Added',
        message: 'New stock for product XYZ has been added.',
        type: 'Inventory Update',
        createdAt: new Date(),
        priority: 'low'
    },

    // Team-related Notifications:
    {
        isRead: false,
        title: 'Task Assigned to Team',
        message: 'A new task has been assigned to your team: Task 1. Please review and take action.',
        type: 'Team Alert',
        createdAt: new Date(),
        priority: 'high'
    },
    {
        isRead: false,
        title: 'Task Removed from Team',
        message: 'The task Task 1 has been removed from your team.',
        type: 'Team Update',
        createdAt: new Date(),
        priority: 'low'
    },
    {
        isRead: false,
        title: 'You\'ve Been Added to a Team',
        message: 'You have been added to the team: Team A. Check your tasks and get started!',
        type: 'Team Update',
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        isRead: false,
        title: 'You\'ve Been Removed from a Team',
        message: 'You have been removed from the team: Team A. Please check your tasks for further updates.',
        type: 'Team Update',
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        isRead: false,
        title: 'Team Announcement',
        message: 'A new announcement has been made for your team. Please check it in the announcements section.',
        type: 'Team Update',
        createdAt: new Date(),
        priority: 'low'
    },

    // User-related Notifications:
    {
        isRead: false,
        title: 'User Approval Pending',
        message: 'Your account is currently under review. You will be notified once it is approved.',
        type: 'User Alert',
        createdAt: new Date(),
        priority: 'high'
    },
    {
        isRead: false,
        title: 'Account Approved',
        message: 'Your account has been approved. Welcome to the system!',
        type: 'User Update',
        createdAt: new Date(),
        priority: 'low'
    },
    {
        isRead: false,
        title: 'Role Updated',
        message: 'Your role has been changed to "Manager". You may now access new features.',
        type: 'User Update',
        createdAt: new Date(),
        priority: 'medium'
    },

    // Shipment-related Notifications:
    {
        isRead: false,
        title: 'New Shipment Added',
        message: 'A new shipment has been added: Shipment A. Please check the shipments section for details.',
        type: 'Shipment Update',
        createdAt: new Date(),
        priority: 'low'
    },
    {
        isRead: false,
        title: 'Shipment In Progress',
        message: 'The shipment for order 123 is in progress.',
        type: 'Shipment Update',
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        isRead: false,
        title: 'Shipment Status Changed',
        message: 'The shipment for order 123 has changed status to "In Transit".',
        type: 'Shipment Update',
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        isRead: false,
        title: 'Shipment Delivered',
        message: 'The shipment for order 123 has been delivered successfully.',
        type: 'Shipment Update',
        createdAt: new Date(),
        priority: 'low'
    },
    {
        isRead: false,
        title: 'Shipment Delayed',
        message: 'The shipment for order #123 has been delayed. Updated delivery date: 12/12/2024.',
        type: 'Shipment Alert',
        createdAt: new Date(),
        priority: 'high'
    },

    // System-related Notifications:
    {
        isRead: false,
        title: 'System Maintenance',
        message: 'Scheduled system maintenance will occur on 12/12/2024 from 2:00 AM to 4:00 AM.',
        type: 'System Update',
        createdAt: new Date(),
        priority: 'low'
    },
    {
        isRead: false,
        title: 'System Update Available',
        message: 'A new system update (version 2.0) is available. Please update for enhanced performance.',
        type: 'System Update',
        createdAt: new Date(),
        priority: 'medium'
    },

    // Bug Reports and Feedback:
    {
        isRead: false,
        title: 'Bug Report Acknowledged',
        message: 'Your bug report has been received. Our team is investigating it.',
        type: 'Bug Report Update',
        createdAt: new Date(),
        priority: 'medium'
    },
    {
        isRead: false,
        title: 'Feedback Response',
        message: 'Thank you for your feedback. Our team has reviewed it and will take action soon.',
        type: 'Feedback Update',
        createdAt: new Date(),
        priority: 'low'
    }
];
