import styleHistory from './history.module.css';
import useGetHistory from '../../../../utils/Hooks/HistoryHooks/useGetHistory'; // Import the custom hook

export function History() {
  const { history, loading, error } = useGetHistory(); // Using the custom hook

  // Handling loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={styleHistory.mainContent}>
      <table className={styleHistory.transactionTable}>
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Transaction</th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan="2">No transaction history available.</td>
            </tr>
          ) : (
            history.map((transaction, index) => (
              <tr key={index}>
                <td>{formatDate(transaction.createdAt)}</td> {/* Formatting the createdAt date */}
                <td>{transaction.transaction}</td> {/* Using dynamic description from backend */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
