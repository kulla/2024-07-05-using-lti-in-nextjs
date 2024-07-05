export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  context: { params: { endpoint: string } },
) {
  const { endpoint } = context.params

  return Response.json({ message: 'Hello World', endpoint })
}
