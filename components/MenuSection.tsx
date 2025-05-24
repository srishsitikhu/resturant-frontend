import React from "react";
import { FaDollarSign } from "react-icons/fa";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface MenuSectionProps {
  items: MenuItem[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ items }) => (
  <div className="mb-6 last:mb-0">
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div className="flex justify-between items-start gap-4" key={idx}>
          {/* Image */}
          <img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${item.imageUrl}`}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg border"
          />

          {/* Info */}
          <div className="flex-1">
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
          </div>

          {/* Price */}
          <div className="flex items-center text-amber-600 font-medium whitespace-nowrap">
            <FaDollarSign />
            {item.price}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MenuSection;
