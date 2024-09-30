import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Fab } from '@mui/material';
import { FaTrashAlt, FaUserPlus, FaSpinner } from 'react-icons/fa';
import NavBarAdmin from '../../Components/NavBar/NavBarAdmin';
import { BASE_URL } from '../../Components/Constant';

const ManageAdminsPage = () => {
  // État pour stocker la liste des administrateurs récupérés du backend
  const [admins, setAdmins] = useState([]);

  // État pour l'administrateur actuellement sélectionné pour la suppression
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // États pour contrôler l'ouverture des boîtes de dialogue
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Dialogue de confirmation de suppression
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false); // Dialogue d'authentification pour la suppression
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // Dialogue pour ajouter un nouvel administrateur

  // États pour stocker les informations d'authentification
  const [adminEmail, setAdminEmail] = useState(''); // Email de l'administrateur pour la suppression
  const [adminPassword, setAdminPassword] = useState(''); // Mot de passe pour la suppression

  // État pour indiquer si les données sont en cours de chargement
  const [loading, setLoading] = useState(true);

  // État pour stocker les informations du nouvel administrateur lors de l'ajout
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: ''
  });

  // Effectue un appel à l'API pour récupérer la liste des administrateurs lors du montage du composant
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(BASE_URL + "auth/getalladmins");
        setAdmins(response.data); // Met à jour l'état avec les administrateurs récupérés
        setLoading(false); // Arrête l'état de chargement
      } catch (error) {
        console.error('Erreur lors de la récupération des administrateurs :', error);
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []); // [] indique que l'effet ne s'exécutera qu'une seule fois, au montage du composant

  // Gère le clic sur le bouton de suppression d'un administrateur
  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin); // Stocke l'administrateur sélectionné
    setIsConfirmDialogOpen(true); // Ouvre la boîte de dialogue de confirmation
  };

  // Gère la confirmation de suppression, ouvre la boîte de dialogue d'authentification
  const handleConfirmDelete = () => {
    setIsConfirmDialogOpen(false); // Ferme la boîte de dialogue de confirmation
    setIsAuthDialogOpen(true); // Ouvre la boîte de dialogue d'authentification
  };

  // Gère la suppression réelle de l'administrateur
  const handleDeleteAdmin = async () => {
    try {
      // Envoie une requête pour supprimer l'administrateur avec les informations d'authentification
      await axios.delete(BASE_URL+`auth/deleteadmin/${selectedAdmin.id}`, {
        data: {
          email: adminEmail,
          password: adminPassword,
        },
      });
      
      // Met à jour l'état en supprimant l'administrateur de la liste localement
      setAdmins(admins.filter((admin) => admin.id !== selectedAdmin.id));

      // Réinitialise les champs et ferme les boîtes de dialogue
      setIsAuthDialogOpen(false);
      setAdminEmail('');
      setAdminPassword('');
      setSelectedAdmin(null);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'administrateur :', error);
    }
  };

  // Ouvre la boîte de dialogue pour ajouter un nouvel administrateur
  const handleAddAdminClick = () => {
    setIsAddDialogOpen(true);
  };

  // Gère l'ajout d'un nouvel administrateur
  const handleAddAdmin = async () => {
    try {
      // Vérifie si les mots de passe correspondent
      if (newAdmin.password !== newAdmin.confirmedPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }

      // Envoie une requête pour ajouter le nouvel administrateur
      await axios.post(BASE_URL + 'auth/register', newAdmin);

      // Met à jour l'état avec le nouvel administrateur
      setAdmins([...admins, newAdmin]);

      // Réinitialise les champs et ferme la boîte de dialogue
      setIsAddDialogOpen(false);
      setNewAdmin({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmedPassword: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'administrateur :', error);
    }
  };

  return (
    <div className="ManageAdminsPage bg-gray-100 min-h-screen">
      {/* Barre de navigation pour l'administrateur */}
      <NavBarAdmin />
      <div className="ml-72 p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Gérer les Admins</h2>

        {/* Bouton pour ajouter un nouvel administrateur */}
        <div className="mb-4">
          <Fab color="primary" aria-label="add" onClick={handleAddAdminClick}>
            <FaUserPlus />
          </Fab>
          <span className="ml-4 text-gray-600">Ajouter un nouvel admin</span>
        </div>

        {/* Tableau affichant les administrateurs */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom d'utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Nom de famille</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                // Affiche un spinner si les données sont en cours de chargement
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <FaSpinner className="animate-spin text-4xl text-gray-400" />
                  </TableCell>
                </TableRow>
              ) : (
                // Affiche les administrateurs
                admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>{admin.username}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.firstName}</TableCell>
                    <TableCell>{admin.lastName}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteClick(admin)}>
                        <FaTrashAlt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Boîte de dialogue de confirmation de suppression */}
        <Dialog open={isConfirmDialogOpen} onClose={() => setIsConfirmDialogOpen(false)}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer l'administrateur <strong>{selectedAdmin?.username}</strong> ?
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
              Veuillez entrer votre email et mot de passe pour confirmer votre identité et supprimer l'administrateur <strong>{selectedAdmin?.username}</strong>.
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
            <Button onClick={handleDeleteAdmin} color="secondary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Boîte de dialogue pour ajouter un nouvel administrateur */}
        <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
          <DialogTitle>Ajouter un nouvel administrateur</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nom d'utilisateur"
              fullWidth
              value={newAdmin.username}
              onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Prénom"
              fullWidth
              value={newAdmin.firstName}
              onChange={(e) => setNewAdmin({ ...newAdmin, firstName: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Nom de famille"
              fullWidth
              value={newAdmin.lastName}
              onChange={(e) => setNewAdmin({ ...newAdmin, lastName: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Mot de passe"
              type="password"
              fullWidth
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Confirmez le mot de passe"
              type="password"
              fullWidth
              value={newAdmin.confirmedPassword}
              onChange={(e) => setNewAdmin({ ...newAdmin, confirmedPassword: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleAddAdmin} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManageAdminsPage;
