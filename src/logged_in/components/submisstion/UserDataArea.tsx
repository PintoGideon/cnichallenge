import React, { useState, useCallback} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton,
  Box,
  Avatar,
  Typography,
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from "@material-ui/core";
import { PluginListProp } from "../Main";
import DownloadIcon from "@material-ui/icons/ArrowDownward";
import EnhancedTableHead from "../../../shared/EnhancedTableHead";
import HighlightedInformation from "../../../shared/HighlightedInformation";


const styles = (theme: Theme) =>
  createStyles({
    tableWrapper: {
      overflowX: "auto",
      marginTop:'2rem'
    },
    alignRight: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
    },
    primaryIcon: {
      color: theme.palette.primary.main,
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
    id: "icon",
    numeric: true,
    label: "",
  },
  { id: "author", numeric: false, label: "Author" },
  {
    id: "name",
    numeric: false,
    label: "Plugin Name",
  },
  { id: "status", numeric: false, label: "Status" },
  { id: "files", numeric: false, label: "Files Generated" },
  {
    id: "actions",
    numeric: false,
    label: "",
  },
];

const rowsPerPage = 25;
interface CustomTableProps extends WithStyles<typeof styles> {
  pushMessageToSnackbar: (message: string) => void;
  pluginList:PluginListProp[]
}

function CustomTable(props: CustomTableProps) {
  const { classes, pluginList } = props;
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
      <Box width="100%">
        <Typography>My Submissions</Typography>
        <div className={classes.tableWrapper}>
          {pluginList.length > 0 ? (
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={pluginList.length}
                rows={rows}
              />
              <TableBody>
                {pluginList.length > 0 &&
                  pluginList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: PluginListProp, index: number) => (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.firstData}
                        >
                          <Avatar
                            className={classes.avatar}
                            src={row.profilePicUrl}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.author}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.status}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.files && row.files.length > 0 ? "Yes" : "No"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Box display="flex" justifyContent="flex-end">
                            <IconButton
                              color="primary"
                              className={classes.iconButton}
                              onClick={() => {}}
                              aria-label="Download"
                            >
                              <DownloadIcon />
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
                Results are not available or No submissions have been made yet.
              </HighlightedInformation>
            </Box>
          )}
        </div>
        <div className={classes.alignRight}>
          <TablePagination
            component="div"
            count={pluginList.length}
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
              actions: pluginList.length > 0 ? classes.dBlock : classes.dNone,
              caption: pluginList.length > 0 ? classes.dBlock : classes.dNone,
            }}
            labelRowsPerPage=""
          />
        </div>
      </Box>
  
  );
}

export default withStyles(styles, { withTheme: true })(CustomTable);
