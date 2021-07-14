import { Grid } from '@material-ui/core';
import { ModalOverlay } from './Default';
import styled from 'styled-components';
import { User } from '../services/api/types/User';

const ProfileTitle = styled(Grid)`
  text-align: center;
`;

interface profileProps{
  user : User
}

export const Profile = (props : profileProps) => {
  return(
    <ModalOverlay zIndex={20}>
    <ProfileTitle>
        <h2>Profile</h2>
        <h4>{props.user.name} : {props.user.age}</h4>
        <h4>{props.user.email}</h4>
    </ProfileTitle>
    </ModalOverlay>
  )
};
