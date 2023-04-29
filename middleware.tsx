import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const middleware = (req: any) => {
    const jwt = req.cookies.get('jwt')?.value
    const url = req.url;
    if (url.includes('/profile')) {
        // console.log(jwt);

        if (jwt === undefined) {
            // console.log('undidd')
            return NextResponse.redirect('about')
        }
        try {
            verify(jwt, '');
            console.log('godd');
            return NextResponse.next()
        } catch (e) {
            console.log('bad')
            // return NextResponse.redirect('/about')
        }
    }
    return NextResponse.next()
}


export default middleware;