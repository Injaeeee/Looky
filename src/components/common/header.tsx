import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import CreateModal from "../createModal";
import { useAuthStore } from "../../store/authStore";
import { logoutUser } from "../../util/user.api";
import { PinkBorderButton } from "./button";
import { useIsMobile } from "../../hooks/useIsMobile";
import DrawerMenu from "./drawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerDisclosure = useDisclosure();
  const modalDisclosure = useDisclosure();
  const { isAuthenticated, user, restoreSession } = useAuthStore();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <Navigation>
        {isMobile ? (
          <LeftWrapper>
            <button onClick={drawerDisclosure.onOpen}>
              <img src="/icon/menu.svg" alt="menu" width="18px" />
            </button>
            <LogoWrapper to="/">
              <img src="/image/smallLogo.webp" alt="logo" width="90px" />
            </LogoWrapper>
          </LeftWrapper>
        ) : (
          <LeftWrapper>
            {isAuthenticated ? (
              <>
                <UserWrapper to="/mypage">
                  <Avatar name={user?.name} src={user?.imageUrl || ""} />
                  <UserName>{user?.name}</UserName>
                </UserWrapper>
                |
                <PinkBorderButton onClick={handleLogout}>
                  Logout
                </PinkBorderButton>
              </>
            ) : (
              <>
                <Link to="/login">
                  <PinkBorderButton>Login</PinkBorderButton>
                </Link>
                <RouterButton to="/signup">Sign Up</RouterButton>
              </>
            )}
          </LeftWrapper>
        )}
        {!isMobile && (
          <LogoWrapper to="/">
            <img src="/image/logo.webp" alt="logo" width="130px" />
          </LogoWrapper>
        )}
        {isMobile ? (
          <RightWrapper>
            {isAuthenticated ? (
              <>
                <CreateButton onClick={modalDisclosure.onOpen}>
                  <img src="/icon/create.svg" alt="create" />
                  CREATE
                </CreateButton>
                <Menu>
                  <MenuButton>
                    <Avatar name={user?.name} src={user?.imageUrl} />
                  </MenuButton>
                  <MenuList backgroundColor="#262626" border="none">
                    <UserItem>
                      <Avatar name={user?.name} src={user?.imageUrl} />
                      {user?.name}
                    </UserItem>
                    <Link to="/mypage">
                      <MenuItem>
                        <img
                          src="/icon/setting.svg"
                          alt="setting"
                          width="18px"
                          onClick={() => drawerDisclosure.onClose()}
                        />
                        settings
                      </MenuItem>
                    </Link>
                    <MenuPinkItem onClick={handleLogout}>
                      <img
                        src="/icon/logout.svg"
                        alt="logout"
                        width="18px"
                        onClick={() => drawerDisclosure.onClose()}
                      />
                      logout
                    </MenuPinkItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <PinkBorderButton>Login</PinkBorderButton>
                </Link>
                <RouterButton to="/signup">Sign Up</RouterButton>
              </>
            )}
          </RightWrapper>
        ) : (
          <RightWrapper>
            {isAuthenticated && (
              <CreateButton onClick={modalDisclosure.onOpen}>
                <img src="/icon/create.svg" alt="create" width="17px" />
                CREATE
              </CreateButton>
            )}
            <RouterButton to="/list">
              <img src="/icon/article.svg" alt="article" width="17px" />
              게시물
            </RouterButton>
            <RouterButton to="/ranking">
              <img src="/icon/ranking.svg" alt="ranking" width="20px" />
              랭킹
            </RouterButton>
          </RightWrapper>
        )}
      </Navigation>
      <DrawerMenu
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
      />

      {isAuthenticated && (
        <CreateModal
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-bottom: 1px solid var(--pink100);
  background: ${({ $isScrolled }) =>
    $isScrolled ? "var(--black10)" : "transparent"};
  z-index: 5;
`;

const Navigation = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 64px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 0 24px;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: white;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
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

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  color: white;
  padding: 8px 16px;
  border-bottom: solid var(--gray500) 1px;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  color: white;
  padding: 8px 16px;
  border: none;
  &:hover {
    background-color: var(--pink100);
    color: white;
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const MenuPinkItem = styled(MenuItem)`
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

const LogoWrapper = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    position: relative;
  }
`;
