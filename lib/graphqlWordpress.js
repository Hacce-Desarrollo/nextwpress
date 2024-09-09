import { gql } from 'graphql-request';
import { graphqlQuery } from '@/lib/graphqlClient';
import { defaultLanguage } from '@/app/i18n/config';

export default class graphqlWordpress {
  /**
   * LOGO HEADER
  **/
  static async getLogo() {
    const query = gql`query logo_haccenext {
      header {
        opcionesHeader {
          logo {
            node {
              mediaItemUrl
              altText
            }
          }
          logoMenu {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }`;
    try {
      const logo = await graphqlQuery(query);
      return logo;
    } catch (error) {
      throw new Error('Failed to fetch logo');
    }
  }

  /**
   * FOOTER
  **/
  static async getACF_footer() {
    const query = gql`
      query footer_info {
        footer {
          opcionesFooter {
            logoCalidad {
              node {
                altText
                mediaItemUrl
              }
            }
            logoFooter {
              node {
                altText
                mediaItemUrl
              }
            }
            textoFooter
          }
        }
        generales {
          opcionesGenerales {
            direccion
            email
            telefono
          }
        }
      }
    `;
    try {
      const footer = await graphqlQuery(query);
      return footer;
    } catch (error) {
      throw new Error('Failed to fetch footer');
    }
  }

  /**
   * MENÚS
  **/
  static async getMenu(menu, lng = defaultLanguage) {
    if (!menu) throw new Error('Menu slug not specified');

    const query = gql`query getMenu {
      menus(where: {slug: "${menu}", language: "${lng}"}) {
        nodes {
          menuItems(first: 100) {
            nodes {
              label
              order
              title
              target
              uri
              cssClasses
              childItems(first: 100) {
                nodes {
                  label
                  order
                  title
                  target
                  uri
                  cssClasses
                  parentId
                  childItems(first: 100) {
                    nodes {
                      label
                      order
                      title
                      target
                      uri
                      cssClasses
                      childItems(first: 100) {
                        nodes {
                          label
                          order
                          title
                          target
                          uri
                          cssClasses
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;

    try {
      const menuItems = (await graphqlQuery(query)).menus.nodes[0].menuItems.nodes;
      menuItems.map((menuItem) => {
        if (!menuItem.uri.match(/https?\:\/\//)) {
          menuItem.uri = menuItem.uri;
        }
        return menuItem;
      });
      return menuItems;
    } catch (error) {
      throw new Error('Failed to fetch menu');
    }
  }

  /**
   * PÁGINAS
  **/
  static async getPage(uri, lng = defaultLanguage) {
    if (!uri) throw new Error('Page uri not specified');

    const query = gql`query getPage {
      pages(where: {name: "${uri}", language: "${lng}"}, first: 1) {
        nodes {
          id
          title
          uri
          slug
          content  
          link
          seo {
            metaRobotsNofollow
            metaRobotsNoindex
            title
            metaDesc
            opengraphType
            opengraphTitle
            opengraphDescription
            opengraphSiteName
            opengraphUrl
            opengraphImage {
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
          infoInicio {
            descripcionInstalaciones
            descripcionNuestroEquipo
            descripcionContacto
            tituloInstalaciones
            tituloNuestroEquipo
            tituloContacto
            galeriaDeImagenes {
              nodes {
                mediaItemUrl
                altText
              }
            }
            textoCta
            imagen1 {
              node {
                altText
                mediaItemUrl
              }
            }
            imagen2 {
              node {
                altText
                mediaItemUrl
              }
            }
            imagenDelFondo {
              node {
                altText
                mediaItemUrl
              }
            }
            enlace {
              title
              url
            }
            enlaceContacto {
              title
              url
            }
          }
          infoInstalaciones {
            descripcionCTA
            descripcionCTA2
            descripcionGal1
            descripcionGal2
            tituloCTA
            tituloCTA2
            tituloGal1
            tituloGal2
            galeriaDeImagenes1 {
              nodes {
                altText
                mediaItemUrl
              }
            }
            galeriaDeImagenes2 {
              nodes {
                altText
                mediaItemUrl
              }
            }
            imagenDelFondo {
              node {
                altText
                mediaItemUrl
              }
            }
            imagenDelFondo2 {
              node {
                altText
                mediaItemUrl
              }
            }
          }
          infoEquipo {
            descripcionContacto
            enlaceContacto {
              url
              title
            }
            iframeMapa
            tituloContacto
          }
          infoContacto {
            tituloDelBloque
            imagenFondo {
              node {
                altText
                mediaItemUrl
              }
            }
            imagenLogo {
              node {
                altText
                mediaItemUrl
              }
            }
          }
          sliderGallery{
            slider_title
            slider_description
            slider_gallery{
              nodes{
                altText
                mediaItemUrl
              }
            }
          }
        }
      }
    }`;

    try {
      const pageData = await graphqlQuery(query);
      const page = pageData.pages.nodes[0];
      if (page && page.link) {
        page.link = page.link.replace('cms/', '');
      }
      return page;
    } catch (error) {
      //console.log("uuuri: " + uri);
      throw new Error('Failed to fetch page data');
    }
  }

  /* Listado de páginas publicadas por idioma */
  static async getPages(lng) {
    const query = gql`query getPages {
      pages(where: {status: PUBLISH, language: "${lng}"}, first: 100) {
        nodes {
          slug
          uri
          isFrontPage
          seo {
            metaDesc
            title
            fullHead
          }
        }
      }
    }`;

    try {
      const slugPages = await graphqlWordpress.getSlugPagesByLang(lng)
      const pagesData = await graphqlQuery(query);
      const pages = pagesData.pages.nodes
        .filter((page) => !slugPages.includes(page.uri) && page.uri !== null)
        .map((page) => {
          return {
            slug: page.slug,
            lng: lng
          };
        });

      return pages;
    } catch (error) {
      //console.log(error);
      throw new Error('Failed to fetch pages');
    }
  }


  /* Listado de slugs de páginas publicadas por idioma */
  static async getSlugPagesByLang(lng) {
    const query = gql`query getPages {
      pages(where: {status: PUBLISH, language: "${lng}"}, first: 100) {
        nodes {
          slug
        }
      }
    }`;

    try {
      const pagesData = await graphqlQuery(query);
      const slugPages = pagesData.pages.nodes;
      return slugPages;
    } catch (error) {
      //console.log(error);
      throw new Error('Failed to fetch pages');
    }
  }


  /**
   * BLOG
  **/
  static async getPost(slug) {
    if (!slug) throw new Error('Post uri not specified');

    const query = gql`query getPost { 
      postBy(slug: "${slug}") {
        date
        content
        title
        slug
        featuredImage {
          node {
            uri
            mediaItemUrl
          }
        }
        seo {
          metaRobotsNofollow
          metaRobotsNoindex
          title
          metaDesc
          opengraphType
          opengraphTitle
          opengraphDescription
          opengraphSiteName
          opengraphUrl
          opengraphImage {
            mediaDetails {
              width
              height
            }
            sourceUrl
          }
        }
      }
    }`;

    try {
      return (await graphqlQuery(query)).postBy;
    } catch (error) {
      throw new Error('Failed to fetch post');
    }
  }

  static async getPostsPaths(lng) {
    const query = gql`query getPosts {
      posts(where: {status: PUBLISH}, first: 100) {
        nodes {
          uri
          slug
        }
      }
    }`;

    try {
      const postsData = await graphqlQuery(query);
      const posts = postsData.posts.nodes.map((post) => {
        return {
          slug: post.slug,
          lng: lng
        };
      });
      return posts;
    } catch (error) {
      throw new Error('Failed to fetch posts paths');
    }
  }

  static async getPosts( amount ) {
    const query = gql`query getPosts {
      posts(where: {status: PUBLISH}, first: 100) {
        nodes {
          content
          title
          date
          slug
          featuredImage {
            node {
              uri
              mediaItemUrl
            }
          }            
        }
      }
    }`;

    try {
      const postsData = await graphqlQuery(query);
      return postsData.posts.nodes;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  }

  /**
  * EQUIPO SINGLE
 **/
  static async getPersona(slug, lng = defaultLanguage) {
    if (!slug) throw new Error('Page uri not specified');
  
    const query = gql`query getPersona {
      equipo(where: {name: "${slug}", language: "${lng}"}) {
        nodes {
          id
          title
          uri
          slug
          content  
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          } 
          seo {
            metaRobotsNofollow
            metaRobotsNoindex
            title
            metaDesc
            opengraphType
            opengraphTitle
            opengraphDescription
            opengraphSiteName
            opengraphUrl
            opengraphImage {
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }  
          equipo {
            afiliacion
            cargo
            experienciaProfesional
            fieldGroupName
            formacionAcademica
            formacionEspecializada
          }   
        }
      }
    }`;
  
    try {
      const personaData = await graphqlQuery(query);
      if (personaData.equipo.nodes.length === 0) {
        throw new Error('No persona found for the given slug and language');
      }
      const persona = personaData.equipo.nodes[0];
      return persona;
    } catch (error) {
      throw new Error('Failed to fetch persona');
    }
  }
  

  /**
   * EQUIPO
  **/
  static async getPersonas(lng) {
    const query = gql`query equipo {
      equipo(where: {status: PUBLISH, language: "${lng}"}, first: 100) {
        nodes {
          uri
          slug
          title
          date
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          equipo {
            cargo
          }  
        }
      }
    }`;

    try {
      const personasData = await graphqlQuery(query);
      const personas = personasData.equipo.nodes
        .filter((persona) => persona.uri !== null)
        .map((persona) => ({
          slug: persona.slug,
          title: persona.title,
          uri: persona.uri,
          lng: lng,
          date: persona.date,
          cargo: persona.equipo.cargo,
          imagen: persona.featuredImage.node.mediaItemUrl,
        }));
      return personas;
    } catch (error) {
      throw new Error('Failed to fetch personas');
    }
  }
  

}