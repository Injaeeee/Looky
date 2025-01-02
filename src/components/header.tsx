import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Avatar, Image, useDisclosure } from "@chakra-ui/react";
import CreateModal from "./createModal";

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { postId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const excludedPaths = ["/", "/list"];
  const detailPagePath = `/post/${postId}`;

  const existingPath = excludedPaths.includes(location.pathname);
  const existingDetailpath = detailPagePath === location.pathname;

  const [selectedArticle, setSelectedArticle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = () => {
    setSelectedArticle(true);
    onOpen();
  };

  if (isMobile && !existingPath) {
    return null;
  }

  return (
    <HeaderContainer>
      <Navigation>
        <UserWrapper>
          <Avatar name="Oshigaki Kisame" src="" />
          <UserName>@injae</UserName>
        </UserWrapper>
        <Link to="/">
          <Image src="/image/logo.png" alt="logo" />
        </Link>
        <RouterWrapper>
          <CreateButton onClick={() => handleOpenModal()}>
            <Image src="/icon/create.svg" alt="create" />
            CREATE
          </CreateButton>
          <RouterButton to="/list">
            <Image src="/icon/article.svg" alt="article" />
            게시물
          </RouterButton>
          <RouterButton to="/ranking">
            <Image src="/icon/ranking.svg" alt="ranking" />
            랭킹
          </RouterButton>
        </RouterWrapper>
      </Navigation>
      {selectedArticle && <CreateModal isOpen={isOpen} onClose={onClose} />}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-bottom: 1px solid var(--pink100);
  background: #0f0f0f;
  z-index: 5;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 64px;
  margin: 0 auto;

  @media (max-width: 1248px) {
    padding: 0 24px;
  }
  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

const RouterWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const RouterButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--pink100);
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray100);
  background-color: var(--gray600);
  border-radius: 24px;
  padding: 8px 16px;
`;
