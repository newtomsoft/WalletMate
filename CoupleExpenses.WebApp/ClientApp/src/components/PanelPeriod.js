﻿import React, { useReducer, useState } from 'react';
import DialogAddSpending from './DialogAddSpending';
import TableOperations from './TableOperations';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AlarmOn from '@material-ui/icons/AlarmOn';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

const PanelPeriod = ({ periodName, periodId, isExpanded, dispatch }) => {
    const [expandState, onExpend] = useReducer((state) => !state, isExpanded);
    const [isSpendingDialogOpen, openSpendingDialog] = useState(false);

    return (
        <div>
            <DialogAddSpending openState={isSpendingDialogOpen} setOpenState={openSpendingDialog} periodId={periodId} />
            <ExpansionPanel expanded={expandState} >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className="period-title" onClick={onExpend} >
                    <Grid container direction="row" spacing={16}>
                        <Grid item>
                            <AlarmOn />
                        </Grid>
                        <Grid item>
                            <div>{periodName}</div>
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <TableOperations periodId={periodId} expended={expandState} dispatch={dispatch} />
                </ExpansionPanelDetails>

                <BottomNavigation
                    showLabels
                >
                    <BottomNavigationAction label="Ajouter une dépense" icon={<LocalAtmIcon color="secondary" />} onClick={() => { openSpendingDialog(true); }} />
                    <BottomNavigationAction label="Ajouter une recette" icon={<LocalAtmIcon color="primary" />} />
                </BottomNavigation>
            </ExpansionPanel>
        </div>
    );
}

export default PanelPeriod;