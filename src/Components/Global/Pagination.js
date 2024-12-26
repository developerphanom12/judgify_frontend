import styled from "styled-components";

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  // Ensure totalPages is at least 1 and valid
  const totalPages = totalItems > 0 ? Math.max(1, Math.ceil(totalItems / itemsPerPage)) : 1;

  return (
    totalPages > 1 && ( // Render pagination only if there is more than one page
      <PaginationContainer>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          Previous
        </PaginationButton>

        {/* Only create page buttons if totalPages > 1 */}
        {[...Array(totalPages)].map((_, index) => (
          <PaginationButton
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </PaginationButton>
        ))}

        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    )
  );
};

const PaginationContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; // Adjust the gap between buttons as needed
`;

const PaginationButton = styled.button`
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #007bff;
    color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 3px 6px;
    font-size: 13px;
  }
`;
