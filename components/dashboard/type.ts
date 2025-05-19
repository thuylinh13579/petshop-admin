interface FoodProduct {
    _id: string;
    title: string;
    brand: string;
    originalPrice: number;
    discountedPrice?: number;
    quantity: number;
    image: string;
    hoverImage?: string;
    href: string;
    description?: string;
    category?: string;
    createdAt?: Date;
}
interface User {
    _id: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    user_code: string;
    avatar: string;
}

interface FoodProductForm {
    title: string;
    brand: string;
    originalPrice: number;
    discountedPrice?: number;
    quantity: number;
    image: File[];
    hoverImage?: File[];
    description?: string;
    category?: string;
}

interface Order {
    _id: string;
    user_id: string;
    order_code: string;
    product_id: number;
    total: number;
    quantity: number;
    status: string;
}