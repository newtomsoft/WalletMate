﻿import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Post } from './Call'


const DialogAddRecipe = ({ openState, closeDialog, periodId }) =>
{
    const handleSubmit = (event) =>
    {
        event.preventDefault();

        const data = new FormData(event.target);
        const [amount, label, pair, category] = data.values();

        Post("/api/Operation/addRecipe",
            { PeriodId: periodId, Amount: amount, Label: label, Pair: pair, Category: category })
            .then(() => {
                closeDialog();
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    alert('error 401');
                }
            });
    }
   
    return (
        <Dialog
            open={openState}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Ajouter un recette</DialogTitle>
            <form onSubmit={handleSubmit}>
            <DialogContent>
                
                <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-amount">Montant</InputLabel>
                        <Input
                        name="amount"
                        id="adornment-amount"
                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-libelle">Libelle</InputLabel>
                        <Input name="label" id="adornment-libelle" />
                    <RadioGroup
                        row
                        aria-label="Par"
                        name="pair">
                            <FormControlLabel value="1" control={<Radio />} label="Aurélien" />
                            <FormControlLabel value="2" control={<Radio />} label="Marie" />
                    </RadioGroup>
                    <RadioGroup
                        row
                            aria-label="Category"
                            name="category">
                        <FormControlLabel value="1" control={<Radio />} label="Commun" />
                        <FormControlLabel value="2" control={<Radio />} label="Individuelle" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                    <Button color="primary" onClick={()=>closeDialog()}>
                    Annuler
                    </Button>
                    <Button
                    type="submit"
                    color="primary">
                    Valider
                    </Button>
                </DialogActions>
            </form>
        </Dialog>);
}

export default DialogAddRecipe;