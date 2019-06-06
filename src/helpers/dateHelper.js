import moment from 'moment';

export const calculateAge = birthDate => moment().diff(birthDate, 'years');