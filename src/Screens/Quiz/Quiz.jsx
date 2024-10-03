// ManageQuizzesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { FaTrashAlt, FaEdit, FaPlus, FaSpinner } from 'react-icons/fa';
import NavBarAdmin from '../../Components/NavBar/NavBarAdmin';
import { BASE_URL } from '../../Components/Constant';

const ManageQuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [quizDetails, setQuizDetails] = useState({
    question: '',
    response: '',
    category: '',
  });

  // Fetch quizzes from the backend
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(BASE_URL + 'quizzes');
      setQuizzes(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Handle change in quiz details
  const handleQuizDetailsChange = (e) => {
    setQuizDetails({ ...quizDetails, [e.target.name]: e.target.value });
  };

  // Handle delete button click
  const handleDeleteClick = (quiz) => {
    setSelectedQuiz(quiz);
    handleDeleteQuiz();
  };

  // Handle the actual deletion of the quiz
  const handleDeleteQuiz = async () => {
    try {
      await axios.delete(BASE_URL + `quizzes/${selectedQuiz.id}`);
      // Remove the quiz from the list
      setQuizzes(quizzes.filter((quiz) => quiz.id !== selectedQuiz.id));
      setSelectedQuiz(null);
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  // Handle adding new quiz
  const handleAddQuiz = async () => {
    try {
      await axios.post(BASE_URL + 'quizzes', quizDetails);
      // Refresh quizzes after adding
      fetchQuizzes();
      setIsAddDialogOpen(false);
      setQuizDetails({ question: '', response: false, category: '' });
    } catch (error) {
      console.error('Error adding quiz:', error);

    }
  };

  // Handle edit quiz
  const handleEditQuiz = async () => {
    try {
      await axios.put(BASE_URL + `quizzes/${selectedQuiz.id}`, quizDetails);
      // Refresh quizzes after updating
      fetchQuizzes();
      setIsEditDialogOpen(false);
      setSelectedQuiz(null);
      setQuizDetails({ question: '', response: '', category: '' });
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  // Open edit dialog
  const handleEditClick = (quiz) => {
    setSelectedQuiz(quiz);
    setQuizDetails({
      question: quiz.question,
      response: quiz.response,
      category: quiz.category,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="ManageQuizzesPage bg-gray-100 min-h-screen">
      <NavBarAdmin />
      <div className="ml-72 p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Gérer les Quizs</h2>

        {/* Add Quiz Button */}
        <div className="mb-4">
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaPlus />}
            onClick={() => setIsAddDialogOpen(true)}
          >
            Ajouter un nouveau quiz
          </Button>
        </div>

        {/* Quizzes Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Réponse</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <FaSpinner className="animate-spin text-4xl text-gray-400" />
                  </TableCell>
                </TableRow>
              ) : (
                quizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell>{quiz.question}</TableCell>
                    <TableCell>{quiz.response === "true" ? 'Vrai' : 'Faux'}</TableCell>
                    <TableCell>{quiz.category}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(quiz)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(quiz)}>
                        <FaTrashAlt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Quiz Dialog */}
        <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
          <DialogTitle>Ajouter un nouveau quiz</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Question"
              fullWidth
              name="question"
              value={quizDetails.question}
              onChange={handleQuizDetailsChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Réponse</InputLabel>
              <Select
                name="response"
                value={quizDetails.response}
                onChange={handleQuizDetailsChange}
              >
                <MenuItem value={"vrai"}>Vrai</MenuItem>
                <MenuItem value={"false"}>Faux</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Catégorie"
              fullWidth
              name="category"
              value={quizDetails.category}
              onChange={handleQuizDetailsChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleAddQuiz} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Quiz Dialog */}
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Modifier le quiz</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Question"
              fullWidth
              name="question"
              value={quizDetails.question}
              onChange={handleQuizDetailsChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Réponse</InputLabel>
              <Select
                name="response"
                value={quizDetails.response}
                onChange={handleQuizDetailsChange}
              >
                <MenuItem value="true">Vrai</MenuItem>
                <MenuItem value="false">Faux</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Catégorie"
              fullWidth
              name="category"
              value={quizDetails.category}
              onChange={handleQuizDetailsChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleEditQuiz} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManageQuizzesPage;
