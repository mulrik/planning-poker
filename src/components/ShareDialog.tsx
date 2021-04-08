import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";

const ShareDialog = () => {
  const [openShareDialog, setOpenShareDialog] = useState(false);

  let href: string;
  if (window) {
    href = window.location.href;
  }

  const handleClickOpenShareDialog = () => {
    setOpenShareDialog(true);
  };

  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpenShareDialog}
      >
        Invite people
      </Button>
      <Dialog
        open={openShareDialog}
        onClose={handleCloseShareDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Copy this link and send to someone you'd like to invite:
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {href}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ShareDialog;
