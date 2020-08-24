// @flow

import React from "react";

import { Button, Modal } from 'semantic-ui-react'

import SiteWrapper from "../SiteWrapper.react";

import FormMain from "../components/FormComponents/MainForm.react";

function ProfileSetup() {
  const [open, setOpen] = React.useState(false)


    return (
      <SiteWrapper> 
        
        
        <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dimmer={'blurring'}
      open={open}
      trigger={<Button>Show Modal</Button>}
      style={{position: "relative"}}
    >
      <Modal.Header>Welcome to SkillShop! Let's setup your profile.</Modal.Header>

      <Modal.Content scrolling>
        <FormMain />
      </Modal.Content>

</Modal>
      </SiteWrapper>
      
    );
  }

export default ProfileSetup;
