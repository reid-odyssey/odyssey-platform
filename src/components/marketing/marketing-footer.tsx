export function MarketingFooter() {
  return (
    <footer className="bg-muted/30 border-t py-12">
      <div className="container px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/products/asset-manager">Asset Manager</a></li>
            <li><a href="/products/hosting">Hosting</a></li>
            <li><a href="/products/multi-player">Multi-player</a></li>
            <li><a href="/products/spatial-comms">Spatial Comms</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/docs">Documentation</a></li>
            <li><a href="/api">API Reference</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/about">About</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/legal">Legal</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div>
            <h3 className="font-bold mb-4">Odyssey</h3>
            <p className="text-sm text-muted-foreground">
                The complete stack for the spatial web.
            </p>
        </div>
      </div>
      <div className="container px-4 mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Odyssey. All rights reserved.
      </div>
    </footer>
  )
}
