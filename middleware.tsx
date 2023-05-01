import { NextResponse, NextRequest } from "next/server";
import { verifyAuth } from './component/auth';


const middleware = async (req: NextRequest) => {
    const jwt = req.cookies.get('jwt')?.value
    const url = req.url;

    const verifiedToken = jwt && (await verifyAuth(jwt).catch((err) => {
        console.log(err)
    }))

    // if (req.nextUrl.pathname.startsWith('/about') || !jwt) {
    //     return
    // }
    if (req.nextUrl.pathname === '/about') {
        try {
            if (verifiedToken && jwt && jwt !== 'undefined') {
                return NextResponse.redirect(new URL('/profile', req.url))
            } else {

            }
        } catch (e) {
            console.log(e);
        }
    }
    if (req.nextUrl.pathname === '/profile') {
        try {
            if (verifiedToken && jwt && jwt !== 'undefined') {
                console.log('good');

                return NextResponse.next()
            } else {
                console.log('bad');
                return NextResponse.redirect(new URL('/about', req.url))
            }
        } catch (e) {
            console.log(e)
        }
    }
    // if (url.includes('/about')) {
    //     try {
    //         if (verifiedToken && jwt && jwt !== 'undefined') {
    //             return NextResponse.redirect(new URL('/profile', req.url))
    //         } else {

    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // if (url.includes('/profile')) {
    //     // console.log(jwt)

    //     // if (!jwt || jwt === 'undefined') {
    //     //     console.log('undidd')
    //     //     return NextResponse.redirect(new URL('/about', req.url))
    //     // }
    //     try {
    //         if (verifiedToken && jwt && jwt !== 'undefined') {
    //             console.log('good');

    //             return NextResponse.next()
    //         } else {
    //             console.log('bad');
    //             return NextResponse.redirect(new URL('/about', req.url))
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }

    // }
    return NextResponse.next()
}


export const config = {
    matcher: ['/about/:path*', '/profile/:path*'],
}

export default middleware;

