import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

interface MenuItem {
    name: string;
    desc: string;
    price: string;
}

interface MenuSectionProps {
    title: string;
    items: MenuItem[];
}


const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => (
    <div className="mb-6 last:mb-0">
        <h3 className="text-lg font-medium mb-3">{title}</h3>
        <div className="space-y-4">
            {items.map((item, idx) => (
                <div className="flex justify-between" key={idx}>
                    <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                    <div className="flex items-center text-amber-600 font-medium">
                        <FaDollarSign />
                        {item.price}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default MenuSection;
