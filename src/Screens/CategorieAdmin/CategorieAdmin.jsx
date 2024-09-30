import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Fab } from '@mui/material';
import { FaTrashAlt, FaEdit, FaPlus, FaSpinner } from 'react-icons/fa';
import NavBarAdmin from '../../Components/NavBar/NavBarAdmin';
import { BASE_URL } from '../../Components/Constant';

const ManageCategoriesPage = () => {
  // État pour stocker la liste des catégories récupérées du backend
  const [categories, setCategories] = useState([]);

  // État pour indiquer si les données sont en cours de chargement
  const [loading, setLoading] = useState(true);

  // État pour la catégorie actuellement sélectionnée (utilisée pour l'édition ou la suppression)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // États pour contrôler l'ouverture des différentes boîtes de dialogue
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // Pour l'ajout d'une catégorie
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Pour la modification d'une catégorie
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Pour la confirmation de suppression
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false); // Pour l'authentification lors de la suppression

  // États pour stocker les informations d'authentification de l'administrateur
  const [adminEmail, setAdminEmail] = useState(''); // Email pour l'authentification
  const [adminPassword, setAdminPassword] = useState(''); // Mot de passe pour l'authentification

  // État pour stocker les détails de la catégorie (nom et description) lors de l'ajout ou de l'édition
  const [categoryDetails, setCategoryDetails] = useState({
    name: '',
    description: '',
  });

  // Fonction pour récupérer les catégories du backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(BASE_URL + 'categories');
      setCategories(response.data); // Met à jour l'état avec les catégories récupérées
      setLoading(false); // Arrête l'état de chargement
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      setLoading(false); // Arrête l'état de chargement même en cas d'erreur
    }
  };

  // Utilise useEffect pour récupérer les catégories lors du montage du composant
  useEffect(() => {
    fetchCategories();
  }, []); // [] indique que l'effet ne s'exécutera qu'une seule fois, au montage du composant

  // Gérer le clic sur le bouton de suppression d'une catégorie
  const handleDeleteClick = (category) => {
    setSelectedCategory(category); // Stocke la catégorie sélectionnée
    setIsConfirmDialogOpen(true); // Ouvre la boîte de dialogue de confirmation
  };

  // Gérer la confirmation de la suppression, ouvre la boîte de dialogue d'authentification
  const handleConfirmDelete = () => {
    setIsConfirmDialogOpen(false); // Ferme la boîte de dialogue de confirmation
    setIsAuthDialogOpen(true); // Ouvre la boîte de dialogue d'authentification
  };

  // Gérer la suppression réelle de la catégorie
  const handleDeleteCategory = async () => {
    try {
      // Envoie une requête pour supprimer la catégorie avec les informations d'authentification
      await axios.delete(BASE_URL + `categories/${selectedCategory.id}`, {
        data: {
          email: adminEmail,
          password: adminPassword,
        },
      });

      // Met à jour l'état en supprimant la catégorie de la liste localement
      setCategories(categories.filter((category) => category.id !== selectedCategory.id));

      // Réinitialise les champs et ferme les boîtes de dialogue
      setIsAuthDialogOpen(false);
      setAdminEmail('');
      setAdminPassword('');
      setSelectedCategory(null);
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie :', error);
    }
  };

  // Gérer l'ajout d'une nouvelle catégorie
  const handleAddCategory = async () => {
    try {
      // Envoie une requête pour ajouter la nouvelle catégorie
      await axios.post(BASE_URL + 'categories/create', categoryDetails);

      // Rafraîchit les catégories après l'ajout
      fetchCategories();

      // Ferme la boîte de dialogue d'ajout et réinitialise les détails de la catégorie
      setIsAddDialogOpen(false);
      setCategoryDetails({ name: '', description: '' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie :', error);
    }
  };

  // Gérer la modification d'une catégorie
  const handleEditCategory = async () => {
    try {
      // Envoie une requête pour modifier la catégorie sélectionnée
      await axios.put(BASE_URL + `categories/${selectedCategory.id}`, {
        name: categoryDetails.name,
        description: categoryDetails.description,
      });

      // Rafraîchit les catégories après la mise à jour
      fetchCategories();

      // Ferme la boîte de dialogue d'édition et réinitialise les détails de la catégorie
      setIsEditDialogOpen(false);
      setSelectedCategory(null);
      setCategoryDetails({ name: '', description: '' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie :', error);
    }
  };

  // Ouvre la boîte de dialogue d'édition d'une catégorie
  const handleEditClick = (category) => {
    setSelectedCategory(category); // Stocke la catégorie sélectionnée
    setCategoryDetails({ name: category.name, description: category.description }); // Met à jour les détails de la catégorie pour l'édition
    setIsEditDialogOpen(true); // Ouvre la boîte de dialogue d'édition
  };

  return (
    <div className="ManageCategoriesPage bg-gray-100 min-h-screen">
      <NavBarAdmin />
      <div className="ml-72 p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Gérer les Catégories</h2>

        {/* Bouton pour ajouter une nouvelle catégorie */}
        <div className="mb-4">
          <Fab color="primary" aria-label="add" onClick={() => setIsAddDialogOpen(true)}>
            <FaPlus />
          </Fab>
          <span className="ml-4 text-gray-600">Ajouter une nouvelle catégorie</span>
        </div>

        {/* Tableau affichant les catégories */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                // Affiche un spinner si les données sont en cours de chargement
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <FaSpinner className="animate-spin text-4xl text-gray-400" />
                  </TableCell>
                </TableRow>
              ) : (
                // Affiche les catégories
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(category)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(category)}>
                        <FaTrashAlt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Boîte de dialogue pour ajouter une nouvelle catégorie */}
        <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
          <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nom"
              fullWidth
              value={categoryDetails.name}
              onChange={(e) => setCategoryDetails({ ...categoryDetails, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              value={categoryDetails.description}
              onChange={(e) => setCategoryDetails({ ...categoryDetails, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleAddCategory} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>

        {/* Boîte de dialogue pour modifier une catégorie */}
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Modifier la catégorie</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nom"
              fullWidth
              value={categoryDetails.name}
              onChange={(e) => setCategoryDetails({ ...categoryDetails, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              value={categoryDetails.description}
              onChange={(e) => setCategoryDetails({ ...categoryDetails, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleEditCategory} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Boîte de dialogue de confirmation de suppression */}
        <Dialog open={isConfirmDialogOpen} onClose={() => setIsConfirmDialogOpen(false)}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer la catégorie <strong>{selectedCategory?.name}</strong> ?
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
              Veuillez entrer votre email et mot de passe pour confirmer votre identité et supprimer la catégorie <strong>{selectedCategory?.name}</strong>.
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
            <Button onClick={handleDeleteCategory} color="secondary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManageCategoriesPage;
