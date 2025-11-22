import { inter } from "@/lib/font";
import { Pagination, useMediaQuery } from "@mui/material";
import { RefObject } from "react";

type TProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  count: number;
  scrollToRef?: RefObject<HTMLElement>;
};

function CustomPagination({
  currentPage,
  setCurrentPage,
  count,
  scrollToRef,
}: TProps) {
  const mlMatch = useMediaQuery("(min-width: 875px)");
  const calcCoefficient = () => {
    if (mlMatch) return 1;
    return 0.8;
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setCurrentPage(newPage);

    // Scroll tới phần tử nếu ref được truyền vào
    if (scrollToRef?.current) {
      scrollToRef.current.scrollIntoView({
        block: "start",
      });
    }
  };
  return (
    <>
      <Pagination
        count={count}
        siblingCount={1}
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          "Button.MuiPaginationItem-rounded.Mui-selected": {
            background:
              "linear-gradient(180deg, rgba(63,133,233,1) 0%, rgba(48,116,225,1) 50%, rgba(37,105,222,1) 100%)",
            color: "#FFFFFF",
            fontWeight: "700",
          },
          "Button.MuiButtonBase-root": {
            padding: "0",
            minWidth: `${calcCoefficient() * 2}rem`,
            width: `${calcCoefficient() * 2}rem`,
            height: `${calcCoefficient() * 2}rem`,

            fontSize: `${calcCoefficient() * 0.875}rem`,
            fontWeight: "400",
            lineHeight: `${calcCoefficient() * 1.5}rem`,
            bgcolor: "white",
            color: "#333",
            margin: `0px ${calcCoefficient() * 0.5}rem`,
            borderRadius: "6.25rem",
            border: "1px solid #E0E0E0",
          },
          "div.MuiPaginationItem-root": {
            padding: "0",
            minWidth: `${calcCoefficient() * 2}rem`,
            width: `${calcCoefficient() * 2}rem`,
            height: `${calcCoefficient() * 2}rem`,

            fontSize: `${calcCoefficient() * 0.875}rem`,
            fontWeight: "400",
            lineHeight: `${calcCoefficient() * 1.5}rem`,
            bgcolor: "white",
            color: "#333",
            borderRadius: "6.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: `0px ${calcCoefficient() * 0.5}rem`,
          },
          "Button.MuiPaginationItem-previousNext": {
            backgroundColor: "white",
            color: "#333",
          },
          "svg.MuiSvgIcon-root": {
            width: `${calcCoefficient() * 1.5}rem`,
            height: `${calcCoefficient() * 1.5}rem`,
            fill: "#333",
          },
        }}
        className={inter.className}
      />
    </>
  );
}

export default CustomPagination;
