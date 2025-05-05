import Link from "next/link"
import { Button } from "./ui/button"
import { Globe } from "lucide-react"
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

function Footer() {
  return (
    <footer className="border-t py-5">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Diego Lauricella. All rights reserved.
            </p>
            <div className="flex items-center gap-2"> 
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://www.diegolauricella.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Personal Website" 
                >
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Personal Website</span>
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://linkedin.com/in/diegolauricella" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://x.com/yoimdiego" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Profile"
                >
                  <FaXTwitter />
                  <span className="sr-only">X</span>
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://github.com/diegoddie" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <FaGithub />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://youtube.com/@yoimdiego" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                >
                  <FaYoutube />
                  <span className="sr-only">YouTube</span>
                </Link>
              </Button>
          </div>
        </div>
    </footer>
  )
}

export default Footer