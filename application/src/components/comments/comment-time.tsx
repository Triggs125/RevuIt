import { Timestamp } from "firebase/firestore"
import { useCallback, useEffect, useMemo, useState } from "react"
import { CommentType } from "../../../utils/types"
import { useTheme } from "../../../utils/theme"
import { Text } from "react-native-paper"

type CommentTimeProps = {
  comment: CommentType;
}

const CommentTime = ({ comment }: CommentTimeProps) => {
  const { theme } = useTheme();

  const commentSeconds = useMemo(() => new Date(comment.createdAt).getTime() / 1000, [comment.createdAt]);

  const getTime = useCallback(() => {
    let new_time = ''
    const minutes = (Timestamp.now().seconds - commentSeconds) / 60;
    if (minutes / 60 >= 1) {
      const hours = minutes / 60
      if (hours / 24 >= 1) {
        const days = Math.floor(hours / 24)
        new_time = `${days} day${days > 1 ? 's' : ''}`
      } else {
        new_time = Math.floor(hours) + " hr"
      }
    } else {
      new_time = Math.floor(minutes) + " min"
    }
    return new_time
  }, [])
  
  const [time, setTime] = useState(getTime())

  useEffect(() => {
    const timeout = setInterval(() => {
      setTime(getTime())
    }, 5000)

    return () => clearTimeout(timeout)
  }, [getTime])

  return (
    <Text
      variant="bodySmall"
      numberOfLines={1}
      style={{
        color: theme.colors.gray.main,
        marginLeft: theme.spacing()
      }}
    >
      {time}
    </Text>
  )
}

export { CommentTime }
