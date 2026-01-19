"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

const OWNER = "TanayHingane";
const REPO = "SafeBeam03";

export default function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setStars(data.stargazers_count);
      } catch (err) {
        console.error("Failed to fetch stars", err);
      }
    }

    fetchStars();
  }, []);

  return (
    <Badge
      variant="secondary"
      className="flex gap-1"
      onClick={() =>
        window.open(`https://github.com/${OWNER}/${REPO}`, "_blank")
      }
    >
      <Star
        size={16}
        aria-hidden="true"
        className="dark:fill-yellow-300 dark:stroke-yellow-300"
      />
      <span className="text-sm">{stars !== null ? stars : "—"}</span>
    </Badge>
  );
}
