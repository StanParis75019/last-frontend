import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import { FaTrashAlt, FaSpinner } from 'react-icons/fa';
import NavBarAdmin from '../Components/NavBar/NavBarAdmin';
import { BASE_URL } from '../Components/Constant';

const ManageMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Récupère les messages depuis le backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get(BASE_URL + 'messages');
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Gère le clic sur le bouton de suppression
  const handleDeleteClick = (message) => {
    setSelectedMessage(message);
    setIsConfirmDialogOpen(true);
  };

  // Gère la confirmation de suppression
  const handleConfirmDelete = () => {
    setIsConfirmDialogOpen(false);
    setIsAuthDialogOpen(true); // Ouvre la boîte de dialogue d'authentification
  };

  // Gère la suppression réelle du message
  const handleDeleteMessage = async () => {
    try {
      // Envoie une requête au backend pour supprimer le message avec authentification
      await axios.delete(BASE_URL + `messages/${selectedMessage.id}`, {
        data: {
          email: adminEmail,
          password: adminPassword,
        },
      });

      // Supprime le message de la liste localement
      setMessages(messages.filter((message) => message.id !== selectedMessage.id));
      setIsAuthDialogOpen(false);
      setAdminEmail('');
      setAdminPassword('');
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="ManageMessagesPage bg-gray-100 min-h-screen">
      <NavBarAdmin />
      <div className="ml-72 p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Messages des utilisateurs</h2>

        {/* Tableau des messages */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <FaSpinner className="animate-spin text-4xl text-gray-400" />
                  </TableCell>
                </TableRow>
              ) : (
                messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>{message.senderName}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.messageBody}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteClick(message)}>
                        <FaTrashAlt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Boîte de dialogue de confirmation */}
        <Dialog open={isConfirmDialogOpen} onClose={() => setIsConfirmDialogOpen(false)}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer le message de <strong>{selectedMessage?.name}</strong> ?
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

        {/* Boîte de dialogue d'authentification */}
        <Dialog open={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)}>
          <DialogTitle>Authentification Requise</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez entrer votre email et mot de passe pour confirmer votre identité et supprimer le message de <strong>{selectedMessage?.name}</strong>.
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
            <Button onClick={handleDeleteMessage} color="secondary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManageMessagesPage;
