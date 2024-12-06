import { Order } from "../types";

export const orders: Order[] = [
    {
        id: "001",
        customerName: "Alice Smith",
        customerEmail: "alice.smith@example.com",
        customerAddress: "123 Elm St, Springfield, IL",
        status: "processing",
        urgent: false,
        additionalNotes: "Please ensure timely delivery.",
        createdAt: "2024-12-01T09:30:00Z",
        products: [],
    },
    {
        id: "002",
        customerName: "Bob Johnson",
        customerEmail: "bob.johnson@example.com",
        customerAddress: "456 Oak Rd, Oakville, ON",
        status: "shipped",
        urgent: true,
        additionalNotes: "Deliver before the weekend.",
        products: [],
        createdAt: "2024-12-02T10:15:00Z",
    },
    {
        id: "003",
        customerName: "Charlie Brown",
        customerEmail: "charlie.brown@example.com",
        customerAddress: "789 Pine Ave, Roseville, CA",
        status: "delivered",
        urgent: false,
        products: [],
        createdAt: "2024-11-28T14:00:00Z",
        additionalNotes: "Customer left a note for the delivery person.",
    },
    {
        id: "004",
        customerName: "Diana Prince",
        customerEmail: "diana.prince@example.com",
        customerAddress: "101 Maple Ln, Gotham, NY",
        status: "processing",
        urgent: true,
        additionalNotes: "Customer is expecting a call before delivery.",
        products: [],
        createdAt: "2024-12-03T08:30:00Z",
    },
    {
        id: "005",
        customerName: "Eve Adams",
        customerEmail: "eve.adams@example.com",
        customerAddress: "202 Cedar Blvd, Greenfield, WI",
        status: "canceled",
        urgent: false,
        additionalNotes: "Customer changed order.",
        createdAt: "2024-12-01T15:20:00Z",
        products: [],
    },
    {
        id: "006",
        customerName: "Frank Castle",
        customerEmail: "frank.castle@example.com",
        customerAddress: "303 Birch Rd, Liberty City, NJ",
        status: "shipped",
        urgent: true,
        additionalNotes: "Need tracking details immediately.",
        products: [],
        createdAt: "2024-12-02T12:10:00Z",
    },
    {
        id: "007",
        customerName: "Grace Lee",
        customerEmail: "grace.lee@example.com",
        customerAddress: "404 Ash Dr, Fairview, TX",
        status: "delivered",
        urgent: false,
        additionalNotes: "Leave at the porch.",
        products: [],
        createdAt: "2024-11-30T16:45:00Z",
    },
    {
        id: "008",
        customerName: "Hank Pym",
        customerEmail: "hank.pym@example.com",
        customerAddress: "505 Elmwood St, Austin, TX",
        status: "processing",
        urgent: false,
        additionalNotes: "Customer requested eco-friendly packaging.",
        products: [],
        createdAt: "2024-12-01T11:00:00Z",
    },
    {
        id: "009",
        customerName: "Ivy Quinn",
        customerEmail: "ivy.quinn@example.com",
        customerAddress: "606 Pine St, Miami, FL",
        status: "shipped",
        urgent: false,
        additionalNotes: "Please confirm shipping date.",
        products: [],
        createdAt: "2024-12-03T09:30:00Z",
    },
    {
        id: "010",
        customerName: "John Wick",
        customerEmail: "john.wick@example.com",
        customerAddress: "707 Willow Rd, Brooklyn, NY",
        status: "processing",
        urgent: true,
        additionalNotes: "Special request for gift wrap.",
        products: [],
        createdAt: "2024-12-04T10:00:00Z",
    },
    {
        id: "011",
        customerName: "Kara Danvers",
        customerEmail: "kara.danvers@example.com",
        customerAddress: "808 Redwood St, Metropolis, OH",
        status: "delivered",
        urgent: false,
        additionalNotes: "Customer is satisfied with the order.",
        products: [],
        createdAt: "2024-11-29T18:15:00Z",
    },
    {
        id: "012",
        customerName: "Loki Laufeyson",
        customerEmail: "loki.laufeyson@example.com",
        customerAddress: "909 Cherry Ave, Asgard, MI",
        status: "canceled",
        urgent: false,
        additionalNotes: "Customer canceled due to delay.",
        products: [],
        createdAt: "2024-12-02T16:30:00Z",
    },
    {
        id: "013",
        customerName: "Maggie Sawyer",
        customerEmail: "maggie.sawyer@example.com",
        customerAddress: "1010 Cedar Ave, Gotham, NY",
        status: "shipped",
        urgent: true,
        additionalNotes: "Ensure packaging is secure for transit.",
        products: [],
        createdAt: "2024-12-05T08:00:00Z",
    },
    {
        id: "014",
        customerName: "Natasha Romanoff",
        customerEmail: "natasha.romanoff@example.com",
        customerAddress: "1111 Maple Rd, Blackwood, NJ",
        status: "delivered",
        urgent: false,
        additionalNotes: "Delivery received in good condition.",
        products: [],
        createdAt: "2024-11-27T19:10:00Z",
    },
    {
        id: "015",
        customerName: "Oliver Queen",
        customerEmail: "oliver.queen@example.com",
        customerAddress: "1212 Oakwood Blvd, Star City, WA",
        status: "shipped",
        urgent: true,
        additionalNotes: "Priority shipping requested.",
        products: [],
        createdAt: "2024-12-06T10:45:00Z",
    },
    {
        id: "016",
        customerName: "Peter Parker",
        customerEmail: "peter.parker@example.com",
        customerAddress: "1313 Birchwood Dr, Queens, NY",
        status: "processing",
        urgent: false,
        additionalNotes: "Customer requested a follow-up email.",
        products: [],
        createdAt: "2024-12-01T17:25:00Z",
    },
    {
        id: "017",
        customerName: "Quentin Beck",
        customerEmail: "quentin.beck@example.com",
        customerAddress: "1414 Pinewood Ave, Detroit, MI",
        status: "canceled",
        urgent: false,
        additionalNotes: "Order was incorrectly placed.",
        products: [],
        createdAt: "2024-12-04T14:50:00Z",
    },
    {
        id: "018",
        customerName: "Rachel Green",
        customerEmail: "rachel.green@example.com",
        customerAddress: "1515 Willow Rd, New York, NY",
        status: "delivered",
        urgent: false,
        additionalNotes: "Delivery confirmed by customer.",
        products: [],
        createdAt: "2024-11-30T13:05:00Z",
    },
    {
        id: "019",
        customerName: "Steve Rogers",
        customerEmail: "steve.rogers@example.com",
        customerAddress: "1616 Maple Rd, Brooklyn, NY",
        status: "processing",
        urgent: true,
        additionalNotes: "Express delivery requested.",
        products: [],
        createdAt: "2024-12-02T08:00:00Z",
    },
    {
        id: "020",
        customerName: "Tony Stark",
        customerEmail: "tony.stark@example.com",
        customerAddress: "1717 Stark Tower, New York, NY",
        status: "shipped",
        urgent: false,
        additionalNotes: "Shipping details are confirmed.",
        products: [],
        createdAt: "2024-12-01T12:15:00Z",
    }
];