import { FC } from "react";
import ReactPaginate from "react-paginate";
import { useNavigateParams } from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import styles from "./index.module.scss";
import cl from "classnames";

interface PaginationProps {
  totalPages?: number;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ totalPages, className }) => {
  const navigate = useNavigateParams();
  const currentPage = Number(useQueryString("page")) || 1;
  const handleChange = ({ selected }: { selected: number }) =>
    navigate({ page: selected + 1 });

  return (
    <nav>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        nextLinkClassName={styles.pageLink}
        previousLinkClassName={styles.pageLink}
        breakLinkClassName={styles.pageLink}
        onPageChange={handleChange}
        pageRangeDisplayed={2}
        className={cl(className, styles.pagination)}
        activeClassName={styles.active}
        pageLinkClassName={styles.pageLink}
        pageCount={totalPages!}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </nav>
  );
};

export default Pagination;
