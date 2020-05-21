import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

export default function ConfirmationDialog({ open, handleCancel, handleDeleteProject, projectName }) {


    return (
        <div>

            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this project?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The project {projectName} and all its tasks will be permenently deleted and they will be impossible to recover
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteProject} color="primary" autoFocus>
                        Confirm
                     </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}