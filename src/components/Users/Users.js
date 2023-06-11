import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DOMAIN_URL, API_GET_USERS } from "../../utility/backendAPILinks";
import { getAccessTokenFromBrowser } from "../../utility/helpers";
import {
  faTrash,
  faPenToSquare,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteUserModal from "../Modals/DeleteUserModal";
import EditUserModal from "../Modals/EditUserModal";

export default function Users(props) {
  const { User } = props;
  const [userData, setUserData] = useState([]);
  const [deleteUserDisplay, setDeleteUserDisplay] = useState(false);
  const [deleteUserModalContent, setDeleteUserModalContent] = useState({});
  const [currentUserRow, setCurrentUserRow] = useState({});
  const [editUserDisplay, setEditUserDisplay] = useState(false);
  const [editUserModalContent, setEditUserModalContent] = useState({});
  const [currentRecordRow, setCurrentRecordRow] = useState({});

  const getAllUsers = async (access_token) => {
    try {
      if (access_token !== null) {
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        const { data } = await axios.get(
          `${API_DOMAIN_URL}/${API_GET_USERS}`,
          config
        );
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const access_token = getAccessTokenFromBrowser();
    getAllUsers(access_token);
  }, []);

  const deleteUserHandler = async (userDetails) => {
    setDeleteUserDisplay(true);

    const deleteUserModalContentDetails = {
      heading: `Delete User (id : ${userDetails.userId})`,
      type: "Delete",
      buttonText: "Delete",
      userId: userDetails.userId,
      modalDisplay: true,
    };

    setDeleteUserModalContent(deleteUserModalContentDetails);
    setCurrentUserRow(userDetails);
  };

  const editUserHandler = async (userDetails) => {
    setEditUserDisplay(true);

    const editUserModalContentDetails = {
      heading: `Edit User (id : ${userDetails.userId})`,
      type: "Edit",
      buttonText: "Edit",
      userId: userDetails.userId,
      userDetails: userDetails,
      modalDisplay: true,
    };
    setEditUserModalContent(editUserModalContentDetails);
    setCurrentRecordRow(userDetails);
  };

  //Check for admin
  return (
    <div className="mt-20 flex flex-col">
      {deleteUserDisplay && (
        <DeleteUserModal
          content={deleteUserModalContent}
          recordDetails={currentUserRow}
          modalDisplayToggle={setDeleteUserDisplay}
        />
      )}
      {editUserDisplay && (
        <EditUserModal
          content={editUserModalContent}
          userDetails={currentRecordRow}
          modalDisplayToggle={setEditUserDisplay}
        />
      )}

      {userData.length === 0 && <h2>No Users Found</h2>}
      {userData.length > 0 && (
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"></div>
          <table className="min-w-full  text-white ">
            <thead className="text-base text-gray-100 uppercase bg-emerald-600 ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider "
                >
                  User ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                >
                  Edit User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                >
                  Delete User
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr
                  className=" bg-gray-800 border-gray-700 hover:bg-green-600 hover:text-gray-800 "
                  key={user.userId}
                >
                  <td className={`px-6 py-1 `}>
                    {user.userId}{" "}
                    {user.isAdmin && <FontAwesomeIcon icon={faAward} />}
                  </td>
                  <td className={`px-6 py-1 `}>{user.firstName}</td>
                  <td className={`px-6 py-1 `}>{user.lastName}</td>
                  <td className={`px-6 py-1 `}>{user.email}</td>
                  <td
                    className={`px-6 py-1 text-yellow-600 text-2xl cursor-pointer`}
                  >
                    <a
                      onClick={() => {
                        editUserHandler(user);
                      }}
                    >
                      {<FontAwesomeIcon icon={faPenToSquare} />}
                    </a>
                  </td>
                  <td
                    className={`px-6 py-1 text-red-600 text-2xl cursor-pointer`}
                  >
                    {!user.isAdmin && (
                      <a
                        onClick={() => {
                          deleteUserHandler(user);
                        }}
                      >
                        {<FontAwesomeIcon icon={faTrash} />}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
