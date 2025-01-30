'use client';
import { Product as ProductType } from '@/types/product.type';
import Image from 'next/image';
import React, { useMemo, useRef, useState } from 'react';

interface props {
    product: ProductType;
}

const ImageProduct = ({ product }: props) => {
    const [activeImage, setActiveImage] = useState(product.images[0]);
    const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);

    const imageRef = useRef<HTMLImageElement>(null);

    const currentImages = useMemo(
        () => (product ? product?.images.slice(...currentIndexImages) : []),
        [product, currentIndexImages],
    );

    const handleRemoveZoom = () => {
        imageRef.current?.removeAttribute('style');
    };

    const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const image = imageRef.current as HTMLImageElement;
        const { naturalWidth, naturalHeight } = image;

        const offsetX = e.pageX - (rect.x + window.scrollX);
        const offsetY = e.pageY - (rect.y + window.scrollY);

        const top = offsetY * (1 - naturalHeight / rect.height);
        const left = offsetX * (1 - naturalWidth / rect.width);

        image.style.width = naturalWidth + 'px';
        image.style.height = naturalHeight + 'px';
        image.style.top = top + 'px';
        image.style.left = left + 'px';
        image.style.maxWidth = 'unset';
    };

    const next = () => {
        if (currentIndexImages[1] < (product as ProductType)?.images.length) {
            setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
        }
    };

    const Prev = () => {
        if (currentIndexImages[0] > 0) {
            setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
        }
    };

    const chooseActive = (img: string) => {
        setActiveImage(img);
    };

    return (
        <>
            <div
                className="relative w-full pt-[100%] shadow overflow-hidden"
                onMouseLeave={handleRemoveZoom}
                onMouseMove={handleZoom}
            >
                <Image
                    src={activeImage}
                    width={500}
                    height={500}
                    alt={product.name}
                    className="absolute top-0 left-0 h-full w-full bg-white object-cover "
                    ref={imageRef}
                />
            </div>
            <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button
                    onClick={Prev}
                    className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                {currentImages.map((img) => {
                    const isActive = img === activeImage;
                    return (
                        <div className="relative w-full pt-[100%]" key={img} onClick={() => chooseActive(img)}>
                            <Image
                                width={500}
                                height={500}
                                src={img}
                                alt={product.name}
                                className="absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover"
                            />
                            {isActive && <div className="absolute inset-0 border-2 border-orange"></div>}
                        </div>
                    );
                })}
                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default ImageProduct;
