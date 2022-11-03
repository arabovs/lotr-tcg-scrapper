import { gql, useQuery } from "@apollo/client";
import {
  AutoStories,
  Ballot,
  Bolt,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Favorite,
  FavoriteBorderOutlined,
  FormatListBulleted,
  Label,
  LocalOffer,
  Numbers,
  Power,
  Report,
  Share,
  Timeline,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { blue, brown, grey, purple, red } from "@mui/material/colors";
import { alpha, Box } from "@mui/system";
import React, { useState } from "react";
import demoChart from "./../../res/demo-chart.png";
import DataGridDemo from "../../components/DataGridDemo";
import { Link } from "gatsby";

const CardCollapse = ({
  title,
  avatar,
  children = null,
  initialOpen = false,
  noContentPadding = false,
}) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <Card sx={{ mt: 2 }} variant="outlined">
      <CardHeader
        title={title}
        avatar={avatar}
        action={
          <IconButton onClick={() => setOpen((o) => !o)}>
            <ExpandMore />
          </IconButton>
        }
      />
      <Collapse in={open}>
        <Divider />
        <CardContent sx={noContentPadding && { p: "0px !important" }}>
          {children}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const StatCard = ({ title, text, color = null }) => (
  <Card
    sx={{
      p: 1,
      backgroundColor: alpha(color || blue[500], 0.1),
      borderColor: color || blue[500],
    }}
    variant="outlined"
  >
    <Typography
      textAlign={"center"}
      component="div"
      variant="caption"
      gutterBottom
      color={color || blue[500]}
    >
      {title}
    </Typography>
    <Typography textAlign={"center"}>{text}</Typography>
  </Card>
);

const CardPage = (props) => {
  const { id } = props.params;
  const [isPropertiesOpen, setPropertiesOpen] = useState(true);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [isStatsOpen, setStatsOpen] = useState(false);
  const { data, error } = useQuery(
    gql`
      query CardById($id: uuid!) {
        card_generic_by_pk(id: $id) {
          id
          name
          price
          price_foil
          price_other
          card_img: image
          type
          subtype
          set
          rarity
          card_id
          set_code
          cost
          cost_text
          attack
          defence
          flavor_text
          kind
          text: game_text
        }
        similar_cards: lotr_all_cards_pricing(limit: 6) {
          id
          card_name
          card_price
          price_foil
          price_tng
          card_img
        }
      }
    `,
    { variables: { id } }
  );
  if (error) return <div>{error.message}</div>;
  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item sm={5}>
          {data && (
            <>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent={"flex-end"}>
                    <IconButton size="small" sx={{ mb: 1 }}>
                      <FavoriteBorderOutlined fontSize="small" />
                    </IconButton>
                  </Box>
                  <img
                    src={data?.card_generic_by_pk.card_img}
                    style={{ width: "100%" }}
                  />
                </CardContent>
              </Card>
              <Card variant="outlined" sx={{ mt: 2 }}>
                <CardHeader title="Text" avatar={<AutoStories />} />
                <Divider />
                <CardContent>
                  <Typography gutterBottom>
                    {data?.card_generic_by_pk.text}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    "{data?.card_generic_by_pk.flavor_text}"
                  </Typography>
                </CardContent>
                <Divider />
                <CardHeader
                  title="Properties"
                  avatar={<Label />}
                  action={
                    <IconButton onClick={() => setPropertiesOpen((p) => !p)}>
                      {!isPropertiesOpen ? <ExpandMore /> : <ExpandLess />}
                    </IconButton>
                  }
                />
                <Collapse in={isPropertiesOpen}>
                  <Divider />
                  <CardContent>
                    <Grid container display="flex" spacing={1}>
                      {data?.card_generic_by_pk.type && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Type"
                            text={data?.card_generic_by_pk.type}
                          />
                        </Grid>
                      )}
                      {data?.card_generic_by_pk.subtype && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Subtype"
                            text={data?.card_generic_by_pk.subtype}
                          />
                        </Grid>
                      )}
                      {data?.card_generic_by_pk.kind && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Kind"
                            text={data?.card_generic_by_pk.kind}
                          />
                        </Grid>
                      )}
                      {data?.card_generic_by_pk.signet && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Signet"
                            text={data?.card_generic_by_pk.signet}
                          />
                        </Grid>
                      )}
                      {data?.card_generic_by_pk.home && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Home Site"
                            text={data?.card_generic_by_pk.home}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Collapse>
                <Divider />
                <CardHeader
                  title="Stats"
                  avatar={<Bolt />}
                  action={
                    <IconButton onClick={() => setStatsOpen((p) => !p)}>
                      {!isStatsOpen ? <ExpandMore /> : <ExpandLess />}
                    </IconButton>
                  }
                />
                <Collapse in={isStatsOpen}>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={1}>
                      {data?.card_generic_by_pk.cost && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Value"
                            text={data?.card_generic_by_pk.cost}
                          />
                        </Grid>
                      )}
                      {data?.card_generic_by_pk.cost_text && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Cost"
                            text={data?.card_generic_by_pk.cost_text}
                          />
                        </Grid>
                      )}
                      {data?.card_generic_by_pk.attack && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Attack"
                            text={data?.card_generic_by_pk.attack}
                            color={brown[500]}
                          />
                        </Grid>
                      )}
                      {data?.card_generic_by_pk.defence && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Health"
                            text={data?.card_generic_by_pk.defence}
                            color={red[500]}
                          />
                        </Grid>
                      )}
                      {data?.card_generic_by_pk.resistance && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Resistance"
                            text={data?.card_generic_by_pk.resistance}
                            color={purple[500]}
                          />
                        </Grid>
                      )}
                      {data?.card_generic_by_pk.site && (
                        <Grid item sm={4}>
                          <StatCard
                            title="Site"
                            text={data?.card_generic_by_pk.site}
                            color={grey[500]}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Collapse>
                <Divider />
                <CardHeader
                  title="Details"
                  avatar={<Ballot />}
                  action={
                    <IconButton onClick={() => setDetailsOpen((p) => !p)}>
                      {!isDetailsOpen ? <ExpandMore /> : <ExpandLess />}
                    </IconButton>
                  }
                />
                <Collapse in={isDetailsOpen}>
                  <Divider />
                  <CardContent>
                    <Grid container display="flex" spacing={1}>
                      <Grid item sm={4}>
                        <StatCard
                          title="Set"
                          text={data?.card_generic_by_pk.set_code}
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <StatCard
                          title="Card ID"
                          text={data?.card_generic_by_pk.card_id}
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <StatCard
                          title="Rarity"
                          text={data?.card_generic_by_pk.rarity}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Collapse>
              </Card>
            </>
          )}
        </Grid>
        <Grid item sm={7}>
          <Card variant="outlined">
            <CardHeader
              title={`${data?.card_generic_by_pk.name} (#${
                data?.card_generic_by_pk.set_code +
                data?.card_generic_by_pk.card_id
              }) ${
                data?.card_generic_by_pk.set || data?.card_generic_by_pk.set
              }`}
              action={
                <>
                  <IconButton size="small" sx={{ mb: 1 }}>
                    <Share fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ mb: 1 }}>
                    <Report fontSize="small" />
                  </IconButton>
                </>
              }
            />
            <CardContent>
              <Box display="flex" alignItems={"center"}>
                <Box sx={{ mb: 2 }}>
                  Current price <br />{" "}
                  <Typography variant="h4">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(data?.card_generic_by_pk.price || 0)}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  Current price <br />{" "}
                  <Typography variant="h4">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(data?.card_generic_by_pk.price_foil || 0)}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  Current price <br />{" "}
                  <Typography variant="h4">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(data?.card_generic_by_pk.price_other || 0)}
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <Button fullWidth variant="contained">
                    add to cart
                  </Button>
                </Grid>
                <Grid item sm={6}>
                  <Button fullWidth variant="outlined">
                    make an offer
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <CardCollapse
            title={`Price history`}
            avatar={<Timeline />}
            initialOpen
          >
            <img src={demoChart} width={"100%"} />
          </CardCollapse>
          <CardCollapse
            title={`Listings`}
            avatar={<LocalOffer />}
            noContentPadding
          >
            <DataGridDemo />
          </CardCollapse>
          <CardCollapse
            title={`Offers`}
            avatar={<FormatListBulleted />}
            noContentPadding
          >
            <DataGridDemo />
          </CardCollapse>
        </Grid>
      </Grid>
      <CardCollapse title={`More cards like this one`} avatar={<Dashboard />}>
        <Grid container spacing={1}>
          {data?.similar_cards.map((item) => (
            <Grid item sm={2}>
              <Card variant="outlined">
                <CardActionArea component={Link} to={`/card/${item.id}`}>
                  <CardMedia component="img" image={item.card_img} />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle2" noWrap>
                      {item.card_name}
                    </Typography>
                    <Box display="flex" alignItems={"center"}>
                      <Typography variant="body2" color="text.secondary">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(item.price)}
                      </Typography>
                      <Box flex={1} />
                      <Button variant="contained" size="small">
                        buy now
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardCollapse>
    </Container>
  );
};

export default CardPage;
