"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 my-12">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mt-4 text-center text-lg text-muted-foreground lg:-mt-1">
                Have a question, suggestion, or bug to report? Fill out the form
                below.
              </p>

              <div className="mt-12">
                <form
                  action="#"
                  method="POST"
                  className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                >
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        required
                        placeholder="Tony Stark"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="abcde@example.com"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="message-type">Message Type</Label>
                    <div className="mt-1">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a message type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="suggestion">Suggestion</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="subject">Subject</Label>
                    <div className="mt-1">
                      <Input type="text" name="subject" id="subject" required />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <div className="mt-1">
                      <Textarea id="message" name="message" rows={4} required />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <div className="inline-flex flex-col md:flex-row items-center rounded-full bg-muted px-4 py-2">
              <span className="text-lg font-medium text-muted-foreground">
                Or email us at:
              </span>
              <div className="ml-4 flex items-center">
                <a
                  href="mailto:safebeam@example.com"
                  className="text-lg font-semibold text-primary"
                >
                  safebeam@example.com
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() =>
                    navigator.clipboard.writeText("safebeam@example.com")
                  }
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
