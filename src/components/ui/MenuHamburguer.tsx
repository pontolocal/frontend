export const MenuHamburguer = () => {
  return (
    <div className="flex w-[100%] sm:hidden max-w-[94px] ">
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex sm:hidden"
      >
        <path
          d="M3 24V21.3333H21V24H3ZM3 17.3333V14.6667H21V17.3333H3ZM3 10.6667V8H21V10.6667H3Z"
          fill="black"
        />
      </svg>
    </div>
  );
};
