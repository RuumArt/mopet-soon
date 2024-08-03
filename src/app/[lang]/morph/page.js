'use client';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { Wrapper } from '../../(components)/wrapper';

export default async function Page({ params: { lang } }) {
  const sRef = useRef(null);
  useEffect(() => {
    gsap.to(sRef.current, {
      morphSVG:
        'M263.525 0C245.057 0 230.087 14.9706 230.087 33.4379C230.087 46.9936 238.153 58.6653 249.748 63.9148C256.89 67.1485 263.525 73.2315 263.525 81.0717C263.525 88.9119 257.169 95.2677 249.329 95.2677H151.485C127.739 95.2677 108.488 114.518 108.488 138.265C108.488 152.402 115.31 164.945 125.842 172.782C138.016 181.841 151.485 193.563 151.485 208.737C151.485 223.911 139.185 236.212 124.011 236.212H54.4913C24.3966 236.212 0 260.609 0 290.703C0 320.798 24.3966 345.195 54.4913 345.195H223.342C231.353 345.195 237.847 351.689 237.847 359.7C237.847 367.711 231.353 374.205 223.342 374.205H181.987C158.048 374.205 138.642 393.612 138.642 417.551C138.642 441.49 158.048 460.896 181.987 460.896H311.787C316.069 460.896 319.561 464.329 319.633 468.611C319.707 472.996 316.172 476.59 311.787 476.59H309.39C291.607 476.59 277.19 491.006 277.19 508.789C277.19 526.573 291.607 540.989 309.39 540.989H379.39H470.257H580.257C598.04 540.989 612.457 526.573 612.457 508.789C612.457 491.006 598.04 476.59 580.257 476.59H530.12C525.565 476.59 521.851 472.938 521.774 468.383C521.696 463.719 525.455 459.896 530.12 459.896H704.849C728.788 459.896 748.195 440.49 748.195 416.551C748.195 392.612 728.788 373.205 704.849 373.205H688.908C682.695 373.205 677.657 368.168 677.657 361.954C677.657 355.741 682.694 350.703 688.908 350.703H767.805C789.896 350.703 807.805 332.795 807.805 310.703C807.805 288.612 789.896 270.703 767.805 270.703H683.48C677.946 270.703 673.46 266.217 673.46 260.684C673.46 255.15 677.946 250.664 683.48 250.664H694.85C720.613 250.664 741.497 229.779 741.497 204.016C741.497 178.253 720.613 157.368 694.85 157.368H583.179C577.523 157.368 572.939 152.783 572.939 147.128C572.939 141.472 577.523 136.887 583.179 136.887H596.978C611.114 136.887 622.573 125.428 622.573 111.293C622.573 97.1574 611.114 85.6984 596.978 85.6984H479.388C472.134 85.6984 466.253 79.8176 466.253 72.5633C466.253 67.3686 469.476 62.837 473.538 59.599C481.223 53.4725 486.148 44.0303 486.148 33.4379C486.148 14.9706 471.178 0 452.71 0H263.525ZM567.082 33.4379C567.082 24.4391 574.377 17.1441 583.376 17.1441H585.63C594.628 17.1441 601.923 24.4391 601.923 33.4379C601.923 42.4366 594.628 49.7316 585.63 49.7316H583.376C574.377 49.7316 567.082 42.4366 567.082 33.4379ZM789.685 402.767C780.686 402.767 773.391 410.062 773.391 419.061C773.391 428.06 780.686 435.355 789.685 435.355H791.938C800.937 435.355 808.232 428.06 808.232 419.061C808.232 410.062 800.937 402.767 791.938 402.767H789.685ZM215.429 487.323C203.573 487.323 193.963 496.933 193.963 508.789C193.963 520.644 203.573 530.255 215.429 530.255H217.682C229.538 530.255 239.149 520.644 239.149 508.789C239.149 496.933 229.538 487.323 217.682 487.323H215.429Z',
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <Wrapper>
      <svg
        viewBox="0 0 839 541"
        xmlns="http://www.w3.org/2000/svg"
      >
        <clipPath id="mask">
          <path
            ref={sRef}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M324.122 0C305.655 0 290.684 14.9706 290.684 33.4379C290.684 46.9936 298.751 58.6653 310.346 63.9148C317.488 67.1485 324.122 73.2315 324.122 81.0717C324.122 88.9119 317.766 95.2677 309.926 95.2677H152.083C128.336 95.2677 109.086 114.518 109.086 138.265C109.086 152.402 115.908 164.945 126.44 172.782C138.613 181.841 152.083 193.563 152.083 208.737C152.083 223.911 139.782 236.212 124.608 236.212H55.089C24.9942 236.212 0.597656 260.609 0.597656 290.703C0.597656 320.798 24.9942 345.195 55.089 345.195H203.939C211.95 345.195 218.444 351.689 218.444 359.7C218.444 367.711 211.95 374.205 203.939 374.205H192.585C168.646 374.205 149.24 393.612 149.24 417.551C149.24 441.49 168.646 460.896 192.585 460.896H372.385C376.667 460.896 380.158 464.329 380.23 468.611C380.304 472.996 376.77 476.59 372.385 476.59H369.987C352.204 476.59 337.788 491.006 337.788 508.789C337.788 526.573 352.204 540.989 369.987 540.989H439.987H510.855H580.855C598.638 540.989 613.054 526.573 613.054 508.789C613.054 491.006 598.638 476.59 580.855 476.59H570.718C566.162 476.59 562.448 472.938 562.372 468.383C562.293 463.719 566.053 459.896 570.718 459.896H705.447C729.386 459.896 748.792 440.49 748.792 416.551C748.792 392.612 729.386 373.205 705.447 373.205H629.506C623.292 373.205 618.255 368.168 618.255 361.954C618.255 355.741 623.292 350.703 629.506 350.703H798.402C820.494 350.703 838.402 332.795 838.402 310.703C838.402 288.612 820.494 270.703 798.402 270.703H744.077C738.543 270.703 734.057 266.217 734.057 260.684C734.057 255.15 738.543 250.664 744.077 250.664H755.447C781.21 250.664 802.095 229.779 802.095 204.016C802.095 178.253 781.21 157.368 755.447 157.368H643.777C638.121 157.368 633.536 152.783 633.536 147.128C633.536 141.472 638.121 136.887 643.777 136.887H667.576C681.711 136.887 693.17 125.428 693.17 111.293C693.17 97.1574 681.711 85.6984 667.576 85.6984H569.986C562.732 85.6984 556.851 79.8176 556.851 72.5633C556.851 67.3686 560.073 62.837 564.135 59.599C571.821 53.4725 576.746 44.0303 576.746 33.4379C576.746 14.9706 561.775 0 543.308 0H324.122ZM607.68 33.4379C607.68 24.4391 614.975 17.1441 623.974 17.1441H626.227C635.226 17.1441 642.521 24.4391 642.521 33.4379C642.521 42.4366 635.226 49.7316 626.227 49.7316H623.974C614.975 49.7316 607.68 42.4366 607.68 33.4379ZM810.282 402.767C801.284 402.767 793.989 410.062 793.989 419.061C793.989 428.06 801.284 435.355 810.282 435.355H812.536C821.535 435.355 828.83 428.06 828.83 419.061C828.83 410.062 821.535 402.767 812.536 402.767H810.282ZM276.026 487.323C264.171 487.323 254.56 496.933 254.56 508.789C254.56 520.644 264.171 530.255 276.026 530.255H278.28C290.135 530.255 299.746 520.644 299.746 508.789C299.746 496.933 290.135 487.323 278.28 487.323H276.026Z"
            fill="#00C2FF"
          />
        </clipPath>
      </svg>
    </Wrapper>
  );
}
