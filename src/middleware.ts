export { default } from 'next-auth/middleware'

export const config = { matcher: ['/admin/profile', '/admin/portfolio/:path*', '/admin/skill/:path*'] }
