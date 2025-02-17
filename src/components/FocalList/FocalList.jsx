import { useState } from 'react';
import styleFocalList from './focalList.module.css'; // Import custom CSS
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export function FocalList() {
  // Sample data for the list of Focal Users (you can replace this with data fetched from an API)
  const [focalUsers, setFocalUsers] = useState([
    {
      id: 1,
      focal_number: '001',
      last_name: 'Doe',
      first_name: 'John',
      email_address: 'john.doe@example.com',
      region: 'Region I - Ilocos Region',
      province: 'Ilocos Norte',
      focal_status: 'PRIMARY',
      image: 'https://via.placeholder.com/50', // Add a sample image URL
    },
    {
      id: 2,
      focal_number: '002',
      last_name: 'Smith',
      first_name: 'Jane',
      email_address: 'jane.smith@example.com',
      region: 'Region III - Central Luzon',
      province: 'Pampanga',
      focal_status: 'SECONDARY',
      image: 'https://via.placeholder.com/50', // Add a sample image URL
    },
    // Add more sample users as needed
  ]);

  // Handle viewing a focal user's details
  const handleView = (user) => {
    alert(`Viewing details for ${user.first_name} ${user.last_name}`);
    console.log('Selected User:', user);
  };

  // Handle removing a focal user
  const handleRemove = (userId) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setFocalUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success('User removed successfully!');
    }
  };

  return (
    <div className={styleFocalList.container}>
      {/* Title */}
      <h2 className={styleFocalList.title}>Focal Users List</h2>

      {/* List of Focal Users with Actions Button */}
      <div className={styleFocalList.userList}>
        {focalUsers.map((user) => (
          <div key={user.id} className={styleFocalList.userItem}>
            {/* Image, Name, and Region */}
            <div className={styleFocalList.userInfo}>
              {/* Image */}
              <img src={user.image} alt={`${user.first_name} ${user.last_name}`} className={styleFocalList.userImage} />
              {/* Name and Region */}
              <div className={styleFocalList.textInfo}>
                <strong>{`${user.first_name} ${user.last_name}`}</strong>
                <span>{user.region}</span>
              </div>
            </div>

            {/* Actions Menu */}
            <div className={styleFocalList.actions}>
              {/* Three-dot Menu */}
              <div className={styleFocalList.dropdown}>
                <button className={styleFocalList.dropdownButton}>⋮</button>
                <ul className={styleFocalList.dropdownMenu}>
                  <li>
                    <button
                      className={styleFocalList.dropdownItem}
                      onClick={() => handleView(user)}
                    >
                      View
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styleFocalList.dropdownItem} ${styleFocalList.removeButton}`}
                      onClick={() => handleRemove(user.id)}
                    >
                      Remove
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to Redirect to Focal Form */}
      <div className={styleFocalList.addButtonContainer}>
        <Link to="/focal-form" className="btn btn-primary btn-lg px-4">
          Add New Focal User
        </Link>
      </div>
    </div>
  );
}