import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/actions/user/userActions";
import { useDispatch } from "react-redux";
import { AppState } from "../redux/store";

const SOCKET_URL = import.meta.env.VITE_REACT_APP_CHAT_URL;

interface SocketContextType {
    socket: Socket | null;
    messages: any[];
    onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    messages: [],
    onlineUsers: [],
});

export const useSocketContext = (): SocketContextType => {
    return useContext(SocketContext);
}

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppState>();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [messages, setMessages] = useState<any[]>([]);

    const handleLogout = () => {
        // console.log("222222222222222222222222222ahandle logout");
        dispatch(logout());
    };

    useEffect(() => {
        if ((user?.role === "instructor" || user?.role === "student" || user?.role === "admin") && SOCKET_URL) {
            const newSocket = io(SOCKET_URL, {
                path: "/socket.io/",
                query: {
                    userId: user._id,
                },
                transports: ['websocket']
            });
            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users: string[]) => {
                console.log(users, "socket connection")
                setOnlineUsers(users);
            });

            newSocket.on("message received", (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            newSocket.on("connect", () => {
                console.log("Socket connected");
            });

            newSocket.on("disconnect", () => {
                console.log("Socket disconnected");
            });

            newSocket.on("connect_error", (error) => {
                console.error("Connection error:", error);
            });

            newSocket.on("user-blocked", () => {
                console.log("user blocked");
                handleLogout();
            });

            newSocket.on("error", (error) => {
                console.error("Socket error:", error);
            });

            return () => {
                newSocket.off("getOnlineUsers");
                newSocket.off("message received");
                newSocket.off("connect");
                newSocket.off("block-user");
                newSocket.off("disconnect");
                newSocket.off("connect_error");
                newSocket.off("error");
                newSocket.close();
            };
        } else {
            if (socket) {
                socket.close();
            }
            setSocket(null);
        }
    }, [user]);

    const contextValues: SocketContextType = {
        socket,
        onlineUsers,
        messages
    };

    return (
        <SocketContext.Provider value={contextValues}>
            {children}
        </SocketContext.Provider>
    );
};