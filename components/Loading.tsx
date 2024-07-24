import Image from 'next/image';
import React from 'react';

function Loading({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div>
      <Image
        src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/abfa05c49acf005b8b1e0ef8eb25a67a7057eb20/svg-css/3-dots-fade.svg"
        width={width}
        height={height}
        className={className}
        alt="Loading..."
      />
    </div>
  );
}

export default Loading;
