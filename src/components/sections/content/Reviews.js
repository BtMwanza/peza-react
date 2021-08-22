import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import { Typography } from "@material-ui/core";
import moment from "moment";
import Masonry from "react-masonry-css";

import useStyles from "../../../css/style";
import "./../../../css/App.css";

const CustomCard = ({
  thumbnail,
  title,
  subtitle,
  description,
  joined = false,
}) => {
  const styles = useStyles();
  return (
    <Paper className={styles.reviewsCard}>
      <Row p={2} gap={2}>
        <Avatar className={styles.logo} variant={"rounded"} src={thumbnail} />
        <Info position={"middle"} useStyles={useApexInfoStyles}>
          <InfoTitle>{title}</InfoTitle>
          <InfoSubtitle>
            <Typography variant="caption">{subtitle}</Typography>
          </InfoSubtitle>
        </Info>
      </Row>
      <Box
        pb={1}
        px={2}
        color={"grey.600"}
        fontSize={"0.875rem"}
        fontFamily={"Ubuntu"}
      >
        <Typography>{description}</Typography>
      </Box>
    </Paper>
  );
};

const Reviews = React.memo(function TeamCard({ reviews }) {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <>
      {/* <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Ubuntu", weights: [400, 700] }]} />
      </NoSsr> */}
      <Grid
        container
        spacing={4}
        style={{ marginBottom: 20 }}
        justifyContent="center"
        alignItems="center"
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {reviews.map((item) => {
            const { user, createdAt, text, _id } = item;
            return (
              <Grid item>
                <CustomCard
                  key={_id}
                  thumbnail={user.avatar}
                  title={
                    user.displayName === undefined
                      ? user.email
                      : user.displayName
                  }
                  subtitle={moment(createdAt).format("lll")}
                  description={<>{text}</>}
                />
              </Grid>
            );
          })}
        </Masonry>
      </Grid>
    </>
  );
});
export default Reviews;
