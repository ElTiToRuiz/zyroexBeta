import { Product } from "../types";

export const products: Product[] = [
    {
        id: "P001",
        name: "Laptop",
        sku: "LAP-001",
        price: 999.99,
        stock: 50,
        threshold: 10
    },
    {
        id: "P002",
        name: "Wireless Mouse",
        sku: "MSE-002",
        price: 25.99,
        stock: 200,
        threshold: 20
    },
    {
        id: "P003",
        name: "Keyboard",
        sku: "KEY-003",
        price: 49.99,
        stock: 150,
        threshold: 15
    },
    {
        id: "P004",
        name: "Smartphone",
        sku: "SPH-004",
        price: 799.99,
        stock: 30,
        threshold: 5
    },
    {
        id: "P005",
        name: "Headphones",
        sku: "HPD-005",
        price: 129.99,
        stock: 100,
        threshold: 10
    },
    // {
    //     id: "P006",
    //     name: "Bluetooth Speaker",
    //     sku: "BTS-006",
    //     price: 89.99,
    //     stock: 75,
    //     threshold: 10
    // },
    // {
    //     id: "P007",
    //     name: "Smartwatch",
    //     sku: "SMW-007",
    //     price: 199.99,
    //     stock: 60,
    //     threshold: 10
    // },
    // {
    //     id: "P008",
    //     name: "External Hard Drive",
    //     sku: "EXH-008",
    //     price: 59.99,
    //     stock: 40,
    //     threshold: 5
    // },
    // {
    //     id: "P009",
    //     name: "Laptop Bag",
    //     sku: "LBG-009",
    //     price: 39.99,
    //     stock: 120,
    //     threshold: 15
    // },
    // {
    //     id: "P010",
    //     name: "Webcam",
    //     sku: "WBC-010",
    //     price: 49.99,
    //     stock: 90,
    //     threshold: 10
    // },
    // {
    //     id: "P011",
    //     name: "Portable Charger",
    //     sku: "PCH-011",
    //     price: 19.99,
    //     stock: 150,
    //     threshold: 25
    // },
    // {
    //     id: "P012",
    //     name: "Camera Tripod",
    //     sku: "CTP-012",
    //     price: 39.99,
    //     stock: 60,
    //     threshold: 5
    // },
    // {
    //     id: "P013",
    //     name: "VR Headset",
    //     sku: "VRH-013",
    //     price: 299.99,
    //     stock: 25,
    //     threshold: 3
    // },
    // {
    //     id: "P014",
    //     name: "Wireless Earbuds",
    //     sku: "WEB-014",
    //     price: 89.99,
    //     stock: 120,
    //     threshold: 10
    // },
    // {
    //     id: "P015",
    //     name: "Laptop Stand",
    //     sku: "LPS-015",
    //     price: 29.99,
    //     stock: 80,
    //     threshold: 10
    // },
    // {
    //     id: "P016",
    //     name: "Gaming Mouse",
    //     sku: "GAM-016",
    //     price: 69.99,
    //     stock: 200,
    //     threshold: 15
    // },
    // {
    //     id: "P017",
    //     name: "Gaming Keyboard",
    //     sku: "GKB-017",
    //     price: 129.99,
    //     stock: 180,
    //     threshold: 20
    // },
    // {
    //     id: "P018",
    //     name: "Monitor",
    //     sku: "MNT-018",
    //     price: 199.99,
    //     stock: 40,
    //     threshold: 5
    // },
    // {
    //     id: "P019",
    //     name: "Smart Home Hub",
    //     sku: "SHH-019",
    //     price: 129.99,
    //     stock: 55,
    //     threshold: 10
    // },
    // {
    //     id: "P020",
    //     name: "Action Camera",
    //     sku: "ACM-020",
    //     price: 159.99,
    //     stock: 30,
    //     threshold: 5
    // },
    // {
    //     id: "P021",
    //     name: "Gaming Chair",
    //     sku: "GCH-021",
    //     price: 199.99,
    //     stock: 20,
    //     threshold: 5
    // },
    // {
    //     id: "P022",
    //     name: "Power Bank",
    //     sku: "PWB-022",
    //     price: 14.99,
    //     stock: 250,
    //     threshold: 30
    // },
    // {
    //     id: "P023",
    //     name: "Smart Light Bulb",
    //     sku: "SLB-023",
    //     price: 9.99,
    //     stock: 300,
    //     threshold: 50
    // },
    // {
    //     id: "P024",
    //     name: "Electric Kettle",
    //     sku: "EKL-024",
    //     price: 39.99,
    //     stock: 120,
    //     threshold: 10
    // },
    // {
    //     id: "P025",
    //     name: "Blender",
    //     sku: "BLD-025",
    //     price: 59.99,
    //     stock: 70,
    //     threshold: 10
    // },
    // {
    //     id: "P026",
    //     name: "Toaster",
    //     sku: "TST-026",
    //     price: 24.99,
    //     stock: 90,
    //     threshold: 15
    // },
    // {
    //     id: "P027",
    //     name: "Dishwasher",
    //     sku: "DSW-027",
    //     price: 349.99,
    //     stock: 40,
    //     threshold: 5
    // },
    // {
    //     id: "P028",
    //     name: "Refrigerator",
    //     sku: "RFG-028",
    //     price: 799.99,
    //     stock: 15,
    //     threshold: 2
    // },
    // {
    //     id: "P029",
    //     name: "Microwave Oven",
    //     sku: "MOW-029",
    //     price: 149.99,
    //     stock: 85,
    //     threshold: 10
    // },
    // {
    //     id: "P030",
    //     name: "Coffee Maker",
    //     sku: "CFM-030",
    //     price: 39.99,
    //     stock: 150,
    //     threshold: 20
    // },
    // {
    //     id: "P031",
    //     name: "Electric Grill",
    //     sku: "ELG-031",
    //     price: 99.99,
    //     stock: 40,
    //     threshold: 5
    // },
    // {
    //     id: "P032",
    //     name: "Food Processor",
    //     sku: "FPR-032",
    //     price: 119.99,
    //     stock: 60,
    //     threshold: 10
    // },
    // {
    //     id: "P033",
    //     name: "Waffle Maker",
    //     sku: "WFM-033",
    //     price: 29.99,
    //     stock: 80,
    //     threshold: 15
    // },
    // {
    //     id: "P034",
    //     name: "Sofa",
    //     sku: "SOF-034",
    //     price: 499.99,
    //     stock: 25,
    //     threshold: 3
    // },
    // {
    //     id: "P035",
    //     name: "Dining Table",
    //     sku: "DIN-035",
    //     price: 299.99,
    //     stock: 15,
    //     threshold: 2
    // },
    // {
    //     id: "P036",
    //     name: "Office Chair",
    //     sku: "OFC-036",
    //     price: 89.99,
    //     stock: 150,
    //     threshold: 15
    // },
    // {
    //     id: "P037",
    //     name: "Cabinet",
    //     sku: "CAB-037",
    //     price: 149.99,
    //     stock: 60,
    //     threshold: 10
    // },
    // {
    //     id: "P038",
    //     name: "Bookcase",
    //     sku: "BKS-038",
    //     price: 79.99,
    //     stock: 45,
    //     threshold: 5
    // },
    // {
    //     id: "P039",
    //     name: "Luggage Set",
    //     sku: "LGS-039",
    //     price: 199.99,
    //     stock: 35,
    //     threshold: 5
    // },
    // {
    //     id: "P040",
    //     name: "Backpack",
    //     sku: "BPK-040",
    //     price: 39.99,
    //     stock: 180,
    //     threshold: 20
    // },
    // {
    //     id: "P041",
    //     name: "Wallet",
    //     sku: "WLT-041",
    //     price: 19.99,
    //     stock: 300,
    //     threshold: 50
    // },
    // {
    //     id: "P042",
    //     name: "Leather Belt",
    //     sku: "LBT-042",
    //     price: 24.99,
    //     stock: 220,
    //     threshold: 30
    // },
    // {
    //     id: "P043",
    //     name: "Shoes",
    //     sku: "SHO-043",
    //     price: 59.99,
    //     stock: 100,
    //     threshold: 10
    // },
    // {
    //     id: "P044",
    //     name: "Jacket",
    //     sku: "JKT-044",
    //     price: 99.99,
    //     stock: 80,
    //     threshold: 10
    // },
    // {
    //     id: "P045",
    //     name: "T-Shirt",
    //     sku: "TSH-045",
    //     price: 15.99,
    //     stock: 200,
    //     threshold: 20
    // },
    // {
    //     id: "P046",
    //     name: "Jeans",
    //     sku: "JNS-046",
    //     price: 49.99,
    //     stock: 150,
    //     threshold: 15
    // },
    // {
    //     id: "P047",
    //     name: "Sweater",
    //     sku: "SWT-047",
    //     price: 39.99,
    //     stock: 120,
    //     threshold: 10
    // },
    // {
    //     id: "P048",
    //     name: "Hat",
    //     sku: "HT-048",
    //     price: 19.99,
    //     stock: 100,
    //     threshold: 15
    // },
    // {
    //     id: "P049",
    //     name: "Scarf",
    //     sku: "SCF-049",
    //     price: 14.99,
    //     stock: 90,
    //     threshold: 10
    // },
    // {
    //     id: "P050",
    //     name: "Gloves",
    //     sku: "GLV-050",
    //     price: 9.99,
    //     stock: 60,
    //     threshold: 5
    // }
];
