// app/api/orders/route.js
import dbConnect from '../../../backend/config/dbConnect';
import Order from '../../../backend/models/Order';

export async function GET(request) {
    await dbConnect();
    try {
        const orders = await Order.find({});
        return new Response(JSON.stringify({ success: true, data: orders }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error }), { status: 400 });
    }
}

export async function POST(request) {
    await dbConnect();
    const body = await request.json();
    try {
        const order = await Order.create(body);
        return new Response(JSON.stringify({ success: true, data: order }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error }), { status: 400 });
    }
}
