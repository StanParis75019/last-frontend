import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';
import NavBarAdmin from '../../Components/NavBar/NavBarAdmin';
import { BASE_URL } from '../../Components/Constant';

const ManageUsersPage = () => {
  // État pour stocker la liste des utilisateurs récupérés du backend
  const [users, setUsers] = useState([
    { id: 1, username: "abdel", email: "abdel@gmail.com", role: "admin" }
  ]);

  // État pour l'utilisateur actuellement sélectionné pour la suppression
  const [selectedUser, setSelectedUser] = useState(null);

  // États pour contrôler l'ouverture des boîtes de dialogue
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Dialogue de confirmation de suppression
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false); // Dialogue d'authentification pour la suppression

  // États pour stocker les informations d'authentification
  const [adminEmail, setAdminEmail] = useState(''); // Email de l'administrateur pour la suppression
  const [adminPassword, setAdminPassword] = useState(''); // Mot de passe pour la suppression

  // Effectue un appel à l'API pour récupérer la liste des utilisateurs lors du montage du composant
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(BASE_URL+'users/all');
        setUsers(response.data); // Met à jour l'état avec les utilisateurs récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    };
    fetchUsers();
  }, []); // [] indique que l'effet ne s'exécutera qu'une seule fois, au montage du composant

  // Gère le clic sur le bouton de suppression d'un utilisateur
  const handleDeleteClick = (user) => {
    setSelectedUser(user); // Stocke l'utilisateur sélectionné
    setIsConfirmDialogOpen(true); // Ouvre la boîte de dialogue de confirmation
  };

  // Gère la confirmation de suppression, ouvre la boîte de dialogue d'authentification
  const handleConfirmDelete = () => {
    setIsConfirmDialogOpen(false); // Ferme la boîte de dialogue de confirmation
    setIsAuthDialogOpen(true); // Ouvre la boîte de dialogue d'authentification
  };

  // Gère la suppression réelle de l'utilisateur
  const handleDeleteUser = async () => {
    try {
      // Envoie une requête pour supprimer l'utilisateur avec les informations d'authentification
      await axios.delete(BASE_URL+`users/${selectedUser.id}`, {
        data: {
          email: adminEmail,
          password: adminPassword,
        },
      });
      
      // Met à jour l'état en supprimant l'utilisateur de la liste localement
      setUsers(users.filter((user) => user.id !== selectedUser.id));

      // Réinitialise les champs et ferme les boîtes de dialogue
      setIsAuthDialogOpen(false);
      setAdminEmail('');
      setAdminPassword('');
      setSelectedUser(null);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };

  return (
    <div className="ManageUsersPage bg-gray-100 min-h-screen">
      {/* Barre de navigation pour l'administrateur */}
      <NavBarAdmin />
      <div className="ml-72 p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Gérer les Utilisateurs</h2>

        {/* Tableau affichant les utilisateurs */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom d'utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteClick(user)}>
                      <FaTrashAlt />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Boîte de dialogue de confirmation de suppression */}
        <Dialog open={isConfirmDialogOpen} onClose={() => setIsConfirmDialogOpen(false)}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{selectedUser?.username}</strong> ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsConfirmDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary">
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Boîte de dialogue d'authentification pour la suppression */}
        <Dialog open={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)}>
          <DialogTitle>Authentification Requise</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez entrer votre email et mot de passe pour confirmer votre identité et supprimer l'utilisateur <strong>{selectedUser?.username}</strong>.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Mot de passe"
              type="password"
              fullWidth
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAuthDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleDeleteUser} color="secondary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManageUsersPage;
