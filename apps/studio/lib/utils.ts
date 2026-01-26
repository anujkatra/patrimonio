export function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'painting':
      return slug ? `/gallery/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
