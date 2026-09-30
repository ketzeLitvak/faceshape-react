export const motionStyles = `
.fs-idle,.fs-bounce,.fs-shake { transform-box:fill-box; transform-origin:center; }
.fs-idle { animation:fs-idle 3.6s ease-in-out infinite; }
.fs-bounce { animation:fs-bounce 1s ease-in-out infinite; }
.fs-shake { animation:fs-shake .45s ease-in-out infinite; }
@keyframes fs-idle {0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-1.2px) scale(1.014,.99)}}
@keyframes fs-bounce {0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-3px) scale(.98,1.02)}80%{transform:translateY(0) scale(1.02,.98)}}
@keyframes fs-shake {0%,100%{transform:rotate(0)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}
@media (prefers-reduced-motion:reduce){.fs-idle,.fs-bounce,.fs-shake{animation:none!important}}
`;
