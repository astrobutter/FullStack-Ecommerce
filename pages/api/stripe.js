import Stripe from "stripe";


const stripe= new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        /*
            console.log('Req.body: ',req.body)
            Req.body:  [
            {
                _rev: 'Z2VJU1EXSsX3IBt1qyk7i8',
                _type: 'product',
                name: 'boAt buds 3',
                _id: '47d00e6c-e4ea-4011-9e02-b03a81bfd684',
                slug: { current: 'wireless-earphones', _type: 'slug' },
                image: [ [Object], [Object], [Object], [Object] ],
                price: 2200,
                _updatedAt: '2023-04-12T03:34:20Z',
                _createdAt: '2023-04-12T03:25:57Z',
                details: 'Comfortable and convenient wireless earphones',
                quantity: 1
            }           ]
        */
        try {
            // params are for dynamic routing that is why variables relating to dynamic items are declared in it
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1N6bD0SHATU5T5K52Abkj9ok' },
                    { shipping_rate: 'shr_1N6cnASHATU5T5K5h3s9OKSS' }
                    // { shipping_rate: 'shr_1N6bEmSHATU5T5K5E7jJlfxr' }
                ],
                //line items stores the item details such as price data, quantity for the item(s), since cart has multiple items added into it thats why we have to map through the req.body so that we can get every item in cart.
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('imag/e-', 'https://cdn.sanity.io/images/rbev1nvc/production/').replace('-webp', '.webp');

                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                                description: item.details
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}