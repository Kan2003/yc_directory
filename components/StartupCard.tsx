import { formatdate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface StartupCardtype {
  _id: string;
  title: string;
  slug: string;
  _createdAt: string;
  author: {
    _id: string;
    image: string;
    name: string;
    bio: string;
  };
  description: string;
  image: string;
  views: number;
  category: string;
}

const StartupCard = ({ post }: { post: StartupCardtype }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorId, name },
    title,
    category,
    _id,
    image,
    description,
  } = post;

  console.log(_createdAt)
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatdate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className=" flex-between my-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="tetx-16-medium line-clamp-1 ">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            className="rounded-full"
            src={image}
            alt=""
            width={48}
            height={48}
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card-desc">{description.substring(0, 150) + '...'}</p>
        <img src={image} alt="image" className="startup-card_img mt-2" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-18-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
