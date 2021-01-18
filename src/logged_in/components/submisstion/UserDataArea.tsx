import React, { useState, useCallback } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton,
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from "@material-ui/core";
import { PluginListProp } from "../Main";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DownloadIcon from "@material-ui/icons/ArrowDownward";
import EnhancedTableHead from "../../../shared/EnhancedTableHead";

import HighlightedInformation from "../../../shared/HighlightedInformation";

const styles = (theme: Theme) =>
  createStyles({
    tableWrapper: {
      overflowX: "auto",
    },
    alignRight: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
    },
    blackIcon: {
      color: theme.palette.common.black,
    },
    avatar: {
      width: 28,
      height: 28,
    },
    firstData: {
      paddingLeft: theme.spacing(3),
    },
    iconButton: {
      padding: theme.spacing(1),
    },
    dBlock: {
      display: "block",
    },
    dNone: {
      display: "none",
    },
  });

const rows = [
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  { id: "status", numeric: false, label: "Status" },
];

const rowsPerPage = 25;
interface CustomTableProps extends WithStyles<typeof styles> {
  pushMessageToSnackbar: (message: string) => void;
  computedList: PluginListProp[];
}

function CustomTable(props: CustomTableProps) {
  const { classes, computedList } = props;
  console.log("ComputedList", computedList);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);

  const handleRequestSort = useCallback(
    (__, property) => {
      const _orderBy = property;
      let _order = "desc";
      if (orderBy === property && order === "desc") {
        _order = "asc";
      }
      setOrder(_order as "asc" | "desc");
      setOrderBy(_orderBy);
    },
    [setOrder, setOrderBy, order, orderBy]
  );

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Your Submissions</Typography>
      </AccordionSummary>

      <Box width="100%">
        <div className={classes.tableWrapper}>
          {computedList.length > 0 ? (
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={computedList.length}
                rows={rows}
              />
              <TableBody>
                {computedList.length > 0 &&
                  computedList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: PluginListProp, index: number) => (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.status}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Box display="flex" justifyContent="flex-end">
                            <IconButton
                              className={classes.iconButton}
                              onClick={() => {}}
                              aria-label="Download"
                            >
                              <DownloadIcon className={classes.blackIcon} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          ) : (
            <Box m={2}>
              <HighlightedInformation>
                No friends added yet.
              </HighlightedInformation>
            </Box>
          )}
        </div>
        <div className={classes.alignRight}>
          <TablePagination
            component="div"
            count={computedList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={handleChangePage}
            classes={{
              select: classes.dNone,
              selectIcon: classes.dNone,
              actions: computedList.length > 0 ? classes.dBlock : classes.dNone,
              caption: computedList.length > 0 ? classes.dBlock : classes.dNone,
            }}
            labelRowsPerPage=""
          />
        </div>
      </Box>
    </Accordion>
  );
}

export default withStyles(styles, { withTheme: true })(CustomTable);
